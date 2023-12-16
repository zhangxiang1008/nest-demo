import Joi from 'joi';
export const BoySchema = Joi.object({
  id: Joi.number().integer().min(1),
  boyName: Joi.string().max(20).required(),
  userCP: Joi.number().integer().min(1),
});
