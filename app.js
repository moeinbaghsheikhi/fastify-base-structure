const fastify = require('fastify')({ logger: true });
const sequelize = require('./src/config/db')

// Packages
const Joi = require('joi');

// Plugins
const validatorPlugin = require('./src/plugins/validator')
const responseTimePlugin = require('./src/plugins/responseTime')

fastify.register(require('@fastify/sensible'))
fastify.register(validatorPlugin)
fastify.register(responseTimePlugin)

// test route

const testSchema = Joi.object({
    username: Joi.string().required().min(5)
})

fastify.post('/test', async (req, res) => {
    fastify.validate(testSchema, req.body)

    return req.body
})


// end

// Controller
const userController = require('./src/controllers/userController')

// Routes
const userRoute = require('./src/routes/userRoute')

// Hooks
fastify.addHook("onRequest", async (req, res) => {
    console.log("Get Request!\n",new Date()," \nRequest Detail:" ,req.host)
})

fastify.addHook("preValidation", async (req, res) => {
    const mobile = req.body?.mobile
    if(mobile){
        if(mobile.length == 10){
            req.body.mobile = ("0" + mobile)
        }
    }
})

// fastify.addHook("onSend", async (req, res, payload) => {
//     const data = JSON.parse(payload)
//     const statusCode = res.statusCode

//     let message = "Operation successfully!"
//     if(statusCode > 400) message = "Operation failed!"

//     const response = {statusCode, message, data}

//     return JSON.stringify(response)
// })

fastify.addHook("onResponse", async (req, res) => {
    console.log(`Response sent for ${req.raw.url} with method: ${req.raw.method} with status: ${res.statusCode}`)
})

// my routes
fastify.get('/', async (req, res) => {
    return { message: "Welcome to My SHOP!" }
})

fastify.register(userRoute)

const start = async () => {
    try {
        await sequelize.sync();
        await fastify.listen({ port: 3000 });
        console.log("server running on port 3000");
    } catch(err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();