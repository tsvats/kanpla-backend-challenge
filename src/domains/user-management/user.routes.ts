import { FastifyInstance } from 'fastify'
import { calculateUserBalance } from './user.service'
import { authenticate } from '../../middlewares/authenticaton'
import { userHasAccess } from '../../middlewares/user-access'

export default async function userRoutes(server: FastifyInstance) {
    server.get(
        '/:userId/balance',
        { preHandler: [authenticate, userHasAccess] },
        async request => {
            const { userId } = request.params as { userId: string }
            const balance = calculateUserBalance(userId)
            return { balance }
        },
    )
}
