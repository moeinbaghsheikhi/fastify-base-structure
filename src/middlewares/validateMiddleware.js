const validateQuery = (schema, fastify) => async (req, res) => {
    fastify.validate(schema, req.query)
}

const validateBody = (schema, fastify) => async (req, res) => {
    fastify.validate(schema, req.body)
}

const validateIdParam = (schema, fastify) => async (req, res) => {
    fastify.validate(schema, req.params)
}

module.exports = { validateQuery, validateIdParam, validateBody }