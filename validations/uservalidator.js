const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  phone: Joi.string()
    .pattern(/^09\d{9}$/)
    .message("شماره موبایل باید با 09 شروع شود و 11 رقم باشد").optional(),

  role: Joi.string().valid("user", "admin").default("user"),

  addresses: Joi.array()
    .items(
      Joi.string().length(24)
    )
    .optional(),
});

module.exports = {
  createUserSchema,
};
