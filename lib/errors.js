class Errors {
    static createErrorParam(code, message, name) {
        return {code, message, name};
    }

    static createError(type, message, params) {
        return {'error' : params ? {params, type, message} : {type, message}};
    }

    static createInvalidParamError(code, message, name) {
        return Errors.createError("invalid_param_error", "Invalid data parameters", Errors.createErrorParam(code, message, name))
    }

    static createInvalidRequestError(req) {
        return Errors.createError("invalid_request", `Unable to resolve a request "${req}"`);
    }

    static createInternalServerError(err) {
        return Errors.createError("internal_error", `Internal server error: ${err}`);
    }
}

module.exports = Errors;

