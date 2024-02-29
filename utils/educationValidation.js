import Joi from "joi";

const currentYear = new Date().getFullYear();
const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().max(currentYear).label("Start Year"),
    endYear: isYear.min(Joi.ref('startYear')).max(currentYear).allow(null),
    major: Joi.string().max(100).trim().allow(null, ""),
    degree: Joi.string().max(100).trim().allow(null, "")
});

export {
    isEducation
}