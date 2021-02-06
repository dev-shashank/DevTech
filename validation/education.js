const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.institute = !isEmpty(data.institute) ? data.institute : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Institute Validation
    if(Validator.isEmpty(data.institute)) {
        errors.institute = 'Institute name is required';
    }

    // Degree Validation
    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree is required';
    }

    // Field of study Validation
    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study is required';
    }

    // From Date Validation
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};