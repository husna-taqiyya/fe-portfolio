import Joi from "joi";

const isExperience = Joi.object({
    title: isString100.required().label("Title"),
    company: isString100.required().label("Company"),
    location: isString100.required().label("Location"),
    description: isText.required().label("Description"),
    startDate: Joi.date().less('now').max('now').required().label("Start Date"),
    endDate: Joi.date().less('now').allow(null).label("End Date")
});

export {
    isExperience
}