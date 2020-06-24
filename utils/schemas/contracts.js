const Joi = require("@hapi/joi");

const createContractSchema = {
  date_from: Joi.date().iso().required(),
  date_until: Joi.date().iso().required(),
  date_order: Joi.date().iso(),
  number_order: Joi.string().max(8).required(),
  reason: Joi.string().allow(null),
  attached: Joi.string().max(50).allow(null),
  state_id: Joi.number().positive().exist(),
  applicant_id: Joi.number().positive().exist(),
  object_id: Joi.number().positive().exist(),
  person_id: Joi.number().positive().exist(),
};

const updateContractSchema = {
  date_order: Joi.date().iso().required(),
  number_order: Joi.string().max(8).required(),
  reason: Joi.string().allow(null),
  attached: Joi.string().max(50),
};

module.exports = { createContractSchema, updateContractSchema };
