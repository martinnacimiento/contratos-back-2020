const Joi = require("@hapi/joi");

const sexSchema = {
  sex: Joi.string().max(10).required(),
};

module.exports = {sexSchema}