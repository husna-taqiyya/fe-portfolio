import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    password: Joi.string().min(6).max(100).required().label("Password")
});