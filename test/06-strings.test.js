/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('assert');
const { s } = require('../lib/index');

describe('proto string tests', function() {
    it('should return lower case', function() {
        let t = s('THIS SHOULD BE LOWERCASE.').lower().toString();
        assert.equal(t.toString(), 'this should be lowercase.');
    });
    it('should normalize white space', function() {
        let t = s('This   should be  normalized.').normalize().toString();
        assert.equal(t.toString(), 'This should be normalized.');
    });
});
