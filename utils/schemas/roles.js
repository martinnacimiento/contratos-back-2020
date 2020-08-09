const Joi = require("@hapi/joi");

const RoleSchema = {
  name: Joi.string().max(20).required().messages({
    "string.base": `"nombre" debe ser de tipo 'texto'`,
    "string.max": `"nombre" debe tener una longitud menor a {#limit}`,
    "string.empty": `"nombre" no puede ser un campo vacío`,
    "any.required": `"nombre" es un campo requerido`,
  }),
  slug: Joi.string().pattern(/^[a-z0-9]+(?:\.[a-z0-9]+)*$/).max(20).required().messages({
    "string.base": `"slug" debe ser de tipo 'texto'`,
    "string.regex": `"slug" debe tener el formato correcto`,
    "string.max": `"slug" debe tener una longitud menor a {#limit}`,
    "string.empty": `"slug" no puede ser un campo vacío`,
    "any.required": `"slug" es un campo requerido`,
  }),
  description: Joi.string().required(),
  permissions: Joi.array().items(Joi.number().positive().exist()),
};

module.exports = {RoleSchema}