import fastify from 'fastify'

import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import path from 'path'
import orderRoutes from './domains/order-management/order.routes'

const server = fastify({ logger: true })

server.register(swagger, {
    mode: 'static',
    specification: {
        path: './swagger.json',
        baseDir: path.resolve(__dirname),
    },
})

server.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        },
    },
    staticCSP: true,
    transformStaticCSP: header => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject
    },
    transformSpecificationClone: true,
})

server.register(orderRoutes, { prefix: '/orders' })

const start = async () => {
    try {
        await server.listen(3000)
        console.log('Server listening on http://localhost:3000')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
