import chai from "chai";
// const jsonFixer = require('../jsonFixer');
import jsonFixer from "../jsonFixer.js";
const expect = chai.expect;

describe("Hidden JSON Fixer tests", () => {
  it("Case 5: string unfinished", () => {
    const inp = `{"key1":{"key2":"val`;
    const out = `{"key1":{"key2":"val"}}`;
    expect(jsonFixer.fixJson(inp)).to.equal(out);
  });

  it("Case 6: empty object fix", () => {
    const inp = `{"key1":{}}`;
    const out = `{"key1":{"UNKNOWN_KEY":"VALUE"}}`;
    expect(jsonFixer.fixJson(inp)).to.equal(out);
  });

  it("Case 7: nested unfinished string", () => {
    const inp = `{"a":{"b":{"c":"de`;
    const out = `{"a":{"b":{"c":"de"}}}`;
    expect(jsonFixer.fixJson(inp)).to.equal(out);
  });

  it("Case 8: incomplete key in nested object", () => {
    const inp = `{"a":{"b":{"c`;
    const out = `{"a":{"b":{"c":"VALUE"}}}`;
    expect(jsonFixer.fixJson(inp)).to.equal(out);
  });

  it("Case 9: weird characters in keys", () => {
    const inp = `{"a":{"b":{"c{{":"test"}}}`;
    const out = `{"a":{"b":{"c{{":"test"}}}}`;
    expect(jsonFixer.fixJson(inp)).to.equal(out);
  });
});
