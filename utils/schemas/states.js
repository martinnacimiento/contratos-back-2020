const Joi = require("@hapi/joi");

const stateSchema = {
  state: Joi.string().max(20).required().messages({
    "string.base": `"estado" debe ser de tipo 'texto'`,
    "string.max": `"estado" debe tener una longitud menor a {#limit}`,
    "string.empty": `"estado" no puede ser un campo vacío`,
    "any.required": `"estado" es un campo requerido`,
  }),
};

module.exports = {stateSchema}