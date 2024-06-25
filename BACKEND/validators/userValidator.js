import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  city: Joi.string().required(),
  zipCode: Joi.string().length(5).required(),
  password:Joi.string().length(8).required()
});
const userPartialSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  age: Joi.number().integer().min(0).optional(),
  city: Joi.string().optional(),
  zipCode: Joi.string().length(5).optional(),
  password:Joi.string().length(8).optional()
});
const userIdSchema = Joi.object({
  userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()  // Validates MongoDB ObjectId
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
}
export const validateUserPartial = (req, res, next) => {
  const { error } = userPartialSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const validateUserId = (req, res, next) => {
  const { error } = userIdSchema.validate(req.params);
  if (error) return res.status(400).json({ message: "provide valid id" });
  next();
};


