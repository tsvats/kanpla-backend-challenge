import { FastifyInstance } from 'fastify'
import { calculateUserBalance } from '../user-management/user.service'
import { fetchUserBalanceHistory } from '../user-management/user.service'
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

    server.get(
        '/users/:userId/balance/history',
        { preHandler: [authenticate, userHasAdminAccess] },
        async request => {
            const { userId } = request.params as { userId: string }
            const { from, to } = request.query as {
                from: string
                to: string
            }
            const balanceHistory = fetchUserBalanceHistory(
                userId,
                new Date(from),
                new Date(to),
            )
            return { balanceHistory }
        },
    )
}
