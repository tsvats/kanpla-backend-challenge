import { FastifyInstance } from 'fastify'

export default async function userRoutes(server: FastifyInstance) {
    server.get('/:userId/balance', async request => {
        const { userId } = request.params as { userId: string }
        return { balance: 100 }
    })
}
