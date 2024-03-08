import Joi from "joi";

export const isCreateProject = Joi.object({
    title: isString255.required(),
    description: isText.required(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().min(Joi.ref("startDate")).less('now').allow(null, ''),
    status: Joi.string().valid('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE'),
    url: isURI.allow(null, ''),
    github: isURI.allow(null, ''),
    gitlab: isURI.allow(null, ''),
    company: isString100.allow(null, ''),
    photos: Joi.array().items(Joi.number()), // kumpulan id [1, 2, 3]
    skills: Joi.array().items(Joi.number())
});

// export const isUpdateProject = Joi.object({
//     title: isString255.required(),
//     description: isText.required(),
//     startDate: Joi.date().less('now').required(),
//     endDate: Joi.date().less('now').allow(null, ''),
//     status: Joi.string().valid('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE'),
//     url: isURI.allow(null, ''),
//     github: isURI.allow(null, ''),
//     gitlab: isURI.allow(null, ''),
//     company: isString100.allow(null, ''),
//     photos: Joi.array().items(Joi.number()), // kumpulan id [1, 2, 3]
//     skills: Joi.array().items(Joi.number())
// });