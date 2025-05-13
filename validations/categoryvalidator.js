const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) 
    .min(2)
    .max(100)
    .required(),

  parent: Joi.string().length(24).allow(null), 
  icon: Joi.string().uri().optional() 
});

module.exports = {
  categorySchema
};
