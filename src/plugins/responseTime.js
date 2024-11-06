const fp = require('fastify-plugin');

async function responseTimePlugin(fastify) {
    fastify.addHook("onRequest", async (req) => {
        req.sendRequestTime = Date.now()
    })
    
    fastify.addHook('onSend', async (req) => {
        const requestTime = Date.now() - req.sendRequestTime
        console.log(`Response time for ${req.raw.url}: ${requestTime} ms`)
    })
}

module.exports = fp(responseTimePlugin);