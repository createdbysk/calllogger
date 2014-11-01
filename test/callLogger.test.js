describe('callLogger', function () {
    var callLogger;
    var sinon;
    var testFunction;
    var expectedReturnValue;
    var expect;
    var logger;
    var consoleLogSpy;
    beforeEach(function (done) {
        'use strict';
        callLogger = require('../callLogger');
        sinon = require("sinon");
        expect = require('expect.js');
        // Setup the test function to return the expected value.
        testFunction = sinon.stub();
        expectedReturnValue = 42;
        testFunction.onFirstCall().returns(expectedReturnValue);
        testFunction.returns(undefined);
        consoleLogSpy = sinon.spy(console, "log");
        done();
    });
    afterEach(function (done) {
        consoleLogSpy.restore();
        done();
    });
    it('should call function under test.', function (done) {
        var returnValue = callLogger(testFunction);
        sinon.assert.calledOnce(testFunction);
        expect(returnValue).to.be(expectedReturnValue);
        done();
    });
    it('should not call the default logger, which is console.log, with no configuration.', function (done) {
        var returnValue = callLogger(testFunction);
        sinon.assert.notCalled(consoleLogSpy);
        done();
    });
});