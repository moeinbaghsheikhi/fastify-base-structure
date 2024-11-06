const Joi = require('joi')

const paginationSchema = Joi.object({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(3).max(12).required()
})

const idParamSchema = Joi.object({
    id: Joi.number().min(1)
})

const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).required(),
    mobile: Joi.string().length(11).required(),
    password: Joi.string().min(8).required()
})


module.exports = { paginationSchema, idParamSchema, userRegisterSchema }