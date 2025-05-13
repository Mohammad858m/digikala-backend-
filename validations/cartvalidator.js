const Joi = require('joi');

const cartSchema = Joi.object({
  user: Joi.string().length(24).required(),

  items: Joi.array().items(
    Joi.object({
      product: Joi.string().length(24).required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required()
});

module.exports = {
  cartSchema
};
