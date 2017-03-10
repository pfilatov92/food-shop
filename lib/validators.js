var _ = require('lodash');
var Errors = require('./errors')

class Validators {
    static isRequiredParam(name, value) {
        if (!value) 
            return Errors.createInvalidParamError("required", `${name} cannot be blank`, name);
    }
    static isIntParam(name, value) {
        if (!Number.isInteger(value))
            return Errors.createInvalidParamError("required", `${name} should be integer`, name);
    }

    static isInRangeParam(name, value, rangeMin, rangeMax) {
        if (value < rangeMin || value > rangeMax)
            return Errors.createInvalidParamError("not_in_range", `${name} should be in range [${rangeMin}, ${rangeMax}]`, name);
    }
}

module.exports = Validators;
