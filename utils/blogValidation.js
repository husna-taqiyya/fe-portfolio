import Joi from "joi";

export const isCreateBlog = Joi.object({
    title: Joi.string().trim().min(3).max(255).required().label("Blog Title"),
    content: Joi.string().trim().min(3).required().label("Blog Content")
});

export const isUpdateBlog = Joi.object({
    title: Joi.string().trim().min(3).max(255).required().label("Blog Title"),
    content: Joi.string().trim().min(3).required().label("Blog Content"),
    photos: Joi.array().items(Joi.number()) // kumpulan id [1, 2, 3]
});