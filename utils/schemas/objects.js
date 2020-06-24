const Joi = require("@hapi/joi");

const objectSchema = {
  object: Joi.string().max(50).required(),
};

module.exports = {objectSchema}