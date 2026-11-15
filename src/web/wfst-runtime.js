/**
 * Browser-side tropical-weight WFST interpreter for a static OpenFst export.
 * Supports epsilon arcs and negative weights (the upstream Burmese grammar has
 * weighted alternatives). Compiled adjacency is cached per static model object.
 */
const EPSILON = new Set(["<eps>", "<epsilon>", ""]);
const COMPILED_MODELS = new WeakMap();

class MinHeap {
  constructor() { this.items = []; }
  push(item) {
    this.items.push(item);
    let i = this.items.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.items[p].cost <= item.cost) break;
      this.items[i] = this.items[p]; i = p;
    }
    this.items[i] = item;
  }
  pop() {
    if (!this.items.length) return null;
    const first = this.items[0], last = this.items.pop();
    if (this.items.length) {
      let i = 0;
      while (true) {
        let child = i * 2 + 1;
        if (child >= this.items.length) break;
        if (child + 1 < this.items.length && this.items[child + 1].cost < this.items[child].cost) child++;
        if (this.items[child].cost >= last.cost) break;
        this.items[i] = this.items[child]; i = child;
      }
      this.items[i] = last;
    }
    return first;
  }
}

function compileModel(model) {
  if (!model || model.available !== true || model.schema_version !== "1.0"
      || !Array.isArray(model.arcs) || !Array.isArray(model.finals)
      || !Number.isInteger(model.start_state)) return null;
  if (COMPILED_MODELS.has(model)) return COMPILED_MODELS.get(model);
  const arcs = new Map();
  let minWeight = 0, maxState = model.start_state;
  for (const arc of model.arcs) {
    if (!Number.isInteger(arc.src) || !Number.isInteger(arc.dst)
        || typeof arc.ilabel !== "string" || typeof arc.olabel !== "string"
        || !Number.isFinite(Number(arc.weight ?? 0))) return null;
    const weight = Number(arc.weight ?? 0);
    minWeight = Math.min(minWeight, weight);
    maxState = Math.max(maxState, arc.src, arc.dst);
    if (!arcs.has(arc.src)) arcs.set(arc.src, []);
    arcs.get(arc.src).push({ ...arc, weight });
  }
  const finals = new Map();
  for (const item of model.finals) {
    if (!Number.isInteger(item.state) || !Number.isFinite(Number(item.weight ?? 0))) return null;
    finals.set(item.state, Number(item.weight ?? 0));
    maxState = Math.max(maxState, item.state);
  }
  const compiled = {
    arcs, finals, minWeight,
    nodeLimit: (Number.isInteger(model.state_count) ? model.state_count : maxState + 1),
  };
  COMPILED_MODELS.set(model, compiled);
  return compiled;
}

function acceptingResult(current, finals, accepted) {
  if (!finals.has(current.state)) return accepted;
  const total = current.cost + finals.get(current.state);
  return !accepted || total < accepted.cost ? { cost: total, output: current.output } : accepted;
}

/** Minimum-cost accepting path over an input sequence of WFST symbols. */
export function transduceWfst(input, model, { maxVisited = 250000 } = {}) {
  const compiled = compileModel(model);
  if (!compiled) return { status: "MODEL_INVALID", ipa: null, reason: "Invalid or absent WFST model." };
  const tokens = Array.isArray(input) ? input : [String(input)];
  const { arcs, finals, minWeight, nodeLimit: stateCount } = compiled;
  const nodeLimit = stateCount * (tokens.length + 1);
  const keyOf = (state, offset) => state + ":" + offset;
  const best = new Map();
  const start = { state: model.start_state, offset: 0, cost: 0, output: "", depth: 0 };
  const startKey = keyOf(start.state, 0);
  best.set(startKey, 0);
  let accepted = null, visited = 0;

  const relax = (current, arc) => {
    let nextOffset = current.offset;
    if (!EPSILON.has(arc.ilabel)) {
      if (tokens[current.offset] !== arc.ilabel) return null;
      nextOffset += 1;
    }
    const nextCost = current.cost + arc.weight;
    const nextKey = keyOf(arc.dst, nextOffset);
    if (nextCost >= (best.get(nextKey) ?? Infinity)) return null;
    best.set(nextKey, nextCost);
    return {
      key: nextKey, state: arc.dst, offset: nextOffset, cost: nextCost,
      output: EPSILON.has(arc.olabel) ? current.output : current.output + arc.olabel,
      depth: current.depth + 1,
    };
  };

  if (minWeight >= 0) {
    const heap = new MinHeap();
    heap.push(start);
    while (heap.items.length) {
      const current = heap.pop();
      if (current.cost > (best.get(keyOf(current.state, current.offset)) ?? Infinity)) continue;
      visited++;
      if (visited > maxVisited) return { status: "LIMIT_EXCEEDED", ipa: null, reason: "WFST search visit limit exceeded." };
      if (current.offset === tokens.length) accepted = acceptingResult(current, finals, accepted);
      for (const arc of arcs.get(current.state) || []) {
        const next = relax(current, arc);
        if (next) heap.push(next);
      }
    }
  } else {
    // SPFA-style label correction handles negative grammar weights. Queue keys
    // refer to the latest best path, so an in-queue improvement is not lost.
    const queue = [startKey], inQueue = new Set([startKey]), bestPath = new Map([[startKey, start]]);
    let head = 0;
    while (head < queue.length) {
      const currentKey = queue[head++];
      const current = bestPath.get(currentKey);
      inQueue.delete(currentKey);
      if (!current || current.cost > (best.get(currentKey) ?? Infinity)) continue;
      visited++;
      if (visited > maxVisited) return { status: "LIMIT_EXCEEDED", ipa: null, reason: "WFST search visit limit exceeded." };
      if (current.offset === tokens.length) accepted = acceptingResult(current, finals, accepted);
      for (const arc of arcs.get(current.state) || []) {
        const next = relax(current, arc);
        if (!next) continue;
        if (next.depth >= nodeLimit) return { status: "NEGATIVE_CYCLE", ipa: null, reason: "Reachable negative-weight cycle in WFST." };
        bestPath.set(next.key, next);
        if (!inQueue.has(next.key)) {
          queue.push(next.key);
          inQueue.add(next.key);
        }
      }
      if (head > 4096 && head * 2 > queue.length) {
        queue.splice(0, head);
        head = 0;
      }
    }
  }

  if (!accepted || !accepted.output) {
    return { status: "UNSUPPORTED", ipa: null, reason: "No accepting WFST path for this input.", visited };
  }
  return {
    status: "CANDIDATE", ipa: accepted.output.normalize("NFC"),
    cost: accepted.cost, visited, provenance: model.provenance || {},
  };
}
