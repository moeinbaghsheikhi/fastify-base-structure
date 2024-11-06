const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateQuery, validateIdParam, validateBody } = require('../middlewares/validateMiddleware')

const { paginationSchema, idParamSchema, userRegisterSchema } = require('../validators/userValidator')

async function userRoute(fastify, options) {
    fastify.get('/users', { preHandler: [authMiddleware, validateQuery(paginationSchema, fastify)] } ,userController.getAll)
    fastify.get('/users/:id', { preHandler: validateIdParam(idParamSchema, fastify) } ,userController.getOne)
    fastify.post('/users/register', { preHandler: validateBody(userRegisterSchema, fastify) } ,userController.register)
    fastify.post('/users/login', userController.login)
}

module.exports = userRoute;