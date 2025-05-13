const Joi = require('joi');

const createReviewSchema = Joi.object({
  user: Joi.string().length(24).required(),   
  product: Joi.string().length(24).required(), 
  rating: Joi.number().min(1).max(5).required(), 
  comment: Joi.string().max(1000).optional()    
});

module.exports = {
  createReviewSchema
};
