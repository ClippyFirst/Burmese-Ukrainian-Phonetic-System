import test from "node:test";
import assert from "node:assert/strict";
import { transduceWfst } from "../../src/web/wfst-runtime.js";

test("WFST runtime finds a minimum-cost accepting path with epsilon arcs", () => {
  const model = {
    schema_version: "1.0", available: true, start_state: 0,
    arcs: [
      {src:0,dst:1,ilabel:"<eps>",olabel:"k",weight:0},
      {src:1,dst:2,ilabel:"ka",olabel:"a",weight:0.2},
      {src:1,dst:3,ilabel:"ka",olabel:"x",weight:1.5},
    ],
    finals: [{state:2,weight:0}],
  };
  const result = transduceWfst("ka", model);
  assert.equal(result.status, "CANDIDATE");
  assert.equal(result.ipa, "ka");
  assert.equal(result.cost, 0.2);
});

test("WFST runtime fails closed for unsupported input and invalid models", () => {
  const model = {schema_version:"1.0",available:true,start_state:0,arcs:[],finals:[]};
  assert.equal(transduceWfst("x", model).status, "UNSUPPORTED");
  assert.equal(transduceWfst("x", null).status, "MODEL_INVALID");
});

test("WFST epsilon cycles terminate under the state/offset best-cost guard", () => {
  const model = {
    schema_version:"1.0",available:true,start_state:0,
    arcs:[
      {src:0,dst:1,ilabel:"<epsilon>",olabel:"<epsilon>",weight:0},
      {src:1,dst:0,ilabel:"<eps>",olabel:"<eps>",weight:0},
      {src:1,dst:2,ilabel:"ka",olabel:"k",weight:0},
    ],
    finals:[{state:2,weight:0}],
  };
  assert.equal(transduceWfst("ka", model).ipa, "k");
});

test("WFST runtime selects the minimum-cost path when the model has negative weights", () => {
  const model = {
    schema_version:"1.0",available:true,start_state:0,
    arcs:[
      {src:0,dst:1,ilabel:"ka",olabel:"a",weight:0.5},
      {src:0,dst:2,ilabel:"ka",olabel:"b",weight:-0.5},
    ],
    finals:[{state:1,weight:0},{state:2,weight:0}],
  };
  const result = transduceWfst(["ka"], model);
  assert.equal(result.ipa, "b");
  assert.equal(result.cost, -0.5);
});
