const Joi = require("@hapi/joi");

const applicantSchema = {
  applicant: Joi.string().required(),
};

module.exports = {applicantSchema}