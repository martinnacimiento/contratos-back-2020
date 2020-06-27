const Joi = require("@hapi/joi");

const sexSchema = {
  sex: Joi.string().max(10).required().messages({
    "string.base": `"sexo" debe ser de tipo 'texto'`,
    "string.max": `"sexo" debe tener una longitud menor a {#limit}`,
    "string.empty": `"sexo" no puede ser un campo vacío`,
    "any.required": `"sexo" es un campo requerido`,
  }),
};

module.exports = { sexSchema };
