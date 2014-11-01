describe('callLogger', function () {
    'use strict';
    var callLogger,
        sinon,
        testFunction,
        expectedReturnValue,
        expect,
        logger,
        consoleLogSpy;
    beforeEach(function (done) {
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
    it('should return a function.', function (done) {
        var loggedFunction = callLogger(testFunction);
        expect(loggedFunction).to.be.a('function');
        done();
    });
    describe('returned function', function () {
        var loggedFunction;
        beforeEach(function (done) {
            loggedFunction = callLogger(testFunction);
            done();
        });
        it('should call function under test when returned function is called.', function (done) {
            var returnValue = loggedFunction();
            sinon.assert.calledOnce(testFunction);
            expect(returnValue).to.be(expectedReturnValue);
            done();
        });
        it('should not call the default logger, which is console.log, with no configuration.', function (done) {
            loggedFunction();
            sinon.assert.notCalled(consoleLogSpy);
            done();
        });
    });

    describe('with logging enabled in the configuration', function () {
        beforeEach(function (done) {
            done();
        });
        it('should call the default logger, which is console.log.', function (done) {
            callLogger.config({
                enabled : true
            });
            var loggedFunction = callLogger(testFunction);
            var returnValue = loggedFunction();
            sinon.assert.calledOnce(consoleLogSpy);
            done();
        });        
    });
});