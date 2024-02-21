import Joi from "joi";

const isEmail = Joi.string().email({ tlds: { allow: false } }).max(100).trim();
const isString = Joi.string().min(3).max(100).trim();
const isPassword = Joi.string().min(6).max(100).trim();

export const loginValidation = Joi.object({
    email: isEmail.required().label('Email'),
    password: isPassword.required().label("Password")
});

export const updateUserValidation = Joi.object({
    name: isString.label("Name"),
    email: isEmail.label("Email"),
    current_password: isPassword.label('Old Password'),
    password: isPassword.label('New Password'),
    confirm_password: isPassword
        .valid(Joi.ref('password'))
        .label('Confirm Password')
        .options({
            messages: {
                'anly.only': '{{#label}} not match'
            }
        })
});