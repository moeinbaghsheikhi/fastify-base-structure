const fp = require('fastify-plugin');
const Joi = require('joi');

async function validatorPlugin(fastify, option) {
    fastify.decorate('validate', (schema, data) => {
        const { error } = schema.validate(data);
       
        if(error) throw fastify.httpErrors.badRequest(error.details[0].message);
    })
}

module.exports = fp(validatorPlugin)