const Joi = require("joi");

const addressSchema = Joi.object({
  user: Joi.string().length(24).required(),

  province: Joi.string().min(2).max(50).required(),

  city: Joi.string().min(2).max(50).required(),
  postalCode: Joi.string().min(5).max(10).required(),

  fullAddress: Joi.string().min(10).max(300).required(),

  isDefault: Joi.boolean().optional(),
});

module.exports = {
  addressSchema,
};
