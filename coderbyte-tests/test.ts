import chai from "chai";
const expect = chai.expect;
// import jsonFixer from "../jsonFixer.js";

const jsonFixer = require('../jsonFixer');

describe('JSON Fixer', () => {
  describe('Case 1', () => {
    it('should fix', () => {
      const inp = `
      {"key1":{"key2":"value1","key3":"value2"},"anotherkey":"va`;
      const out = `{"key1":{"key2":"value1","key3":"value2"},"anotherkey":"va"}`;
      expect(jsonFixer.fixJson(inp)).to.equal(out);
    })
  })
  describe('Case 2', () => {
    it('should fix', () => {
      const inp = `{"key1":{"key2":"value1","key3":"value2"},"anoth`;
      const out = `{"key1":{"key2":"value1","key3":"value2"},"anoth":"VALUE"}`;
      expect(jsonFixer.fixJson(inp)).to.equal(out);
    })
  })
  describe('Case 3', () => {
    it('should fix', () => {
      const inp = `{"a":"b","c":"d","e`;
      const out = `{"a":"b","c":"d","e":"VALUE"}`;
      expect(jsonFixer.fixJson(inp)).to.equal(out);
    })
  })
  describe('Case 4', () => {
    it('should fix', () => {
      const inp = `{"a":"b","c":{"a":{"a":{"a":"b`;
      const out = `{"a":"b","c":{"a":{"a":{"a":"b"}}}}`;
      expect(jsonFixer.fixJson(inp)).to.equal(out);
    })
  })
});
