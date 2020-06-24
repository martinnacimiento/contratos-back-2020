const Joi = require("@hapi/joi");

const stateSchema = {
  state: Joi.string().max(20).required(),
};

module.exports = {stateSchema}