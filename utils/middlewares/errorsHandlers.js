const boom = require('boom');
const { config } = require("../../config");
const debug = require('debug')("app:error");


function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack}; // Object.assign({}, err, stack)
    }
}

function logErrors(err, req, res, next) {
    //Sentry.captureException(err);
    debug(err.stack);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;
    
    res.status(statusCode).json(withErrorStack(payload, err.stack));
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
}