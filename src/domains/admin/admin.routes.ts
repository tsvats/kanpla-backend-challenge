import { FastifyInstance } from 'fastify'
import { calculateUserBalance } from '../user-management/user.service'
import { authenticate } from '../../middlewares/authenticaton'
import { userHasAdminAccess } from '../../middlewares/admin-access'

export default async function adminRoutes(server: FastifyInstance) {
    server.get(
        '/users/:userId/balance',
        { preHandler: [authenticate, userHasAdminAccess] },
        async request => {
            const { userId } = request.params as { userId: string }
            const balance = calculateUserBalance(userId)
            return { balance }
        },
    )
}
