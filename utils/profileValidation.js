import Joi from "joi";
import { isString100, isText, isURI } from "./allValidation";

export const isUpdateProfile = Joi.object({
    email: isEmail,
    firstname: isString100,
    lastname: isString100,
    dob: Joi.date().less('now'),
    city: isString100,
    country: isString100,
    addres: isText,
    phone: isString100,
    job: isString100,
    bio: isText,
    website: isURI,
    github: isURI,
    gitlab: isURI,
    instagram: isURI,
    facebook: isURI,
    twitter: isURI,
    linkedin: isURI,
    discord: isURI
});