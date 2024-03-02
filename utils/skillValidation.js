import Joi from "joi";

const isSkill = Joi.object({
    title: isString100.required(),
    category: isString100.uppercase().required(),
    svg: Joi.string().allow("")
})

export {
    isSkill
}