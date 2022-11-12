const Joi = require("joi");
const schema_1 = Joi.object({
  name: Joi.string().required(),
  contact: Joi.string().required(),
  meterNumber: Joi.required(),
  initialUnits: Joi.number().required(),
  finalUnits: Joi.string().required(),
  consumedUnits: Joi.number().required(),
  unitCost: Joi.number().required(),
  totalCost: Joi.number().required(),
  paid: Joi.number().required(),
  balance: Joi.number().required(),
});
const signup_validator = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6),
});
const change_validator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  oldpass: Joi.string().required(),
});

module.exports = { schema_1, signup_validator, change_validator };
