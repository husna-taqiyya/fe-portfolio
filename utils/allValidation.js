import Joi from "joi";

const isID = Joi.number().positive().required().label("ID");
const isYear = Joi.number().positive()
const isString100 = Joi.string().trim().min(3).max(100);
const isString255 = Joi.string().trim().min(3).max(255);
const isText = Joi.string().min(3).trim();
const isURI = Joi.string().trim().uri();
const isEmail = Joi.string().email({ tlds: { allow: false } }).max(100).trim();

export {
    isID,
    isYear,
    isString100,
    isString255,
    isText,
    isURI,
    isEmail
}