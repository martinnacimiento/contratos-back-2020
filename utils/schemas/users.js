const Joi = require("@hapi/joi");

const userSchema = {
  username: Joi.string().max(20).required().messages({
    "string.base": `"nombre de usuario" debe ser de tipo 'texto'`,
    "string.max": `"nombre de usuario" debe tener una longitud menor a {#limit}`,
    "string.empty": `"nombre de usuario" no puede ser un campo vacío`,
    "any.required": `"nombre de usuario" es un campo requerido`,
  }),
  password: Joi.string().strip().max(30).required().messages({
    "string.base": `"contraseña" debe ser de tipo 'texto'`,
    "string.max": `"contraseña" debe tener una longitud menor a {#limit}`,
    "string.empty": `"contraseña" no puede ser un campo vacío`,
    "any.required": `"contraseña" es un campo requerido`,
  }),
};

module.exports = {userSchema}