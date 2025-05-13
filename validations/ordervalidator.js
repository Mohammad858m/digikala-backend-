const Joi = require('joi');

const orderSchema = Joi.object({
  user: Joi.string().length(24).required(),

  address: Joi.string().length(24).required(),

  items: Joi.array().items(
    Joi.object({
      product: Joi.string().length(24).required(),
      quantity: Joi.number().integer().min(1).required(),
      priceAtPurchase: Joi.number().min(0).required()
    })
  ).min(1).required(),

  status: Joi.string().valid('pending', 'paid', 'shipped', 'delivered', 'cancelled')
    .optional(),

  paymentMethod: Joi.string().valid('online', 'cod').default('online'),

  paidAt: Joi.date().optional(),

  totalPrice: Joi.number().min(0).required()
});

module.exports = {
  orderSchema
};
