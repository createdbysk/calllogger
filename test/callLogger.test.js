describe('callLogger', function () {
    var callLogger;
    var sinon;
    var testFunction;
    var expectedReturnValue;
    var expect;
    beforeEach(function (done) {
        'use strict';
        callLogger = require('../callLogger');
        sinon = require("sinon");
        expect = require('expect.js');
        testFunction = sinon.stub();
        expectedReturnValue = 42;
        testFunction.onFirstCall().returns(expectedReturnValue);
        testFunction.returns(undefined);
        done();
    });
    it('should call function under test.', function (done) {
        var returnValue = callLogger(testFunction);
        sinon.assert.calledOnce(testFunction);
        expect(returnValue).to.be(expectedReturnValue);
        done();
    });
});