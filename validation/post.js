const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    // Text Validation
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Post is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};