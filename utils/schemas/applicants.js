const Joi = require("@hapi/joi");

const applicantSchema = {
  applicant: Joi.string().max(100).required().messages({
    "string.base": `"solicitante" debe ser de tipo 'texto'`,
    "string.max": `"solicitante" debe tener una longitud menor a {#limit}`,
    "string.empty": `"solicitante" no puede ser un campo vacío`,
    "any.required": `"solicitante" es un campo requerido`,
  }),
};

module.exports = { applicantSchema };
