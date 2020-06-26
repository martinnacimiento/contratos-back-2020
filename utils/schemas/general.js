const Joi = require("@hapi/joi");

const idSchema = Joi.number().positive();

module.exports = { idSchema };
