import { FastifyInstance } from 'fastify'
import { calculateUserBalance } from './user.service'

export default async function userRoutes(server: FastifyInstance) {
    server.get('/:userId/balance', async request => {
        const { userId } = request.params as { userId: string }
        const balance = calculateUserBalance(userId)
        return { balance }
    })
}
