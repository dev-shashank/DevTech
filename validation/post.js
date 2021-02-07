const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    // Text Validation
    if(Validator.isEmpty(data.text)) {
        errors.text = 'Post is required';
    } else if(!Validator.isLength(data.text, { min: 10, max: 500})) {
        errors.text = 'Post must be between 10 and 500 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};