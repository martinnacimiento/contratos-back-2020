const Joi = require("@hapi/joi");

const objectSchema = {
  object: Joi.string().max(50).required().messages({
    "string.base": `"objeto" debe ser de tipo 'texto'`,
    "string.max": `"objeto" debe tener una longitud menor a {#limit}`,
    "string.empty": `"objeto" no puede ser un campo vacío`,
    "any.required": `"objeto" es un campo requerido`,
  }),
};

module.exports = {objectSchema}