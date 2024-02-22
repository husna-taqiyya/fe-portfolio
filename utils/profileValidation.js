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
    bio: isText.allow(null, ''),
    website: isURI.allow(null, ''),
    github: isURI.allow(null, ''),
    gitlab: isURI.allow(null, ''),
    instagram: isURI.allow(null, ''),
    facebook: isURI.allow(null, ''),
    twitter: isURI.allow(null, ''),
    linkedin: isURI.allow(null, ''),
    discord: isURI.allow(null, '')
}); 