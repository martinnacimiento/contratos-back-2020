const Joi = require("@hapi/joi");

const personSchema = {
  surname: Joi.string().max(20).required(),
  name: Joi.string().max(50).required(),
  dni: Joi.string().max(8).required(),
  domicile: Joi.string().max(100).allow(null),
  mail: Joi.string().max(50).allow(null),
  telephone: Joi.string().max(20).allow(null),
  date_birth: Joi.date().iso().allow(null),
  cuit: Joi.string().max(11).required(),
  sex_id: Joi.number().positive().exist(),
};


module.exports = { personSchema };
