const Joi = require('joi');

const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).required(),

  description: Joi.string().max(5000).optional(),

  images: Joi.array().items(Joi.string().uri()).optional(),

  price: Joi.number().min(0).required(),

  stock: Joi.boolean().required(),

  category: Joi.string(),

  tags: Joi.array().items(Joi.string().min(1)).optional(),

  brand: Joi.string().max(100).optional(),

  isPublished: Joi.boolean().default(true)
});

module.exports = {
  createProductSchema
};
