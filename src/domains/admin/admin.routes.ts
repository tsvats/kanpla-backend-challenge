import { FastifyInstance } from 'fastify'
import { calculateUserBalance } from '../user-management/user.service'
import { fetchUserBalanceHistory } from '../user-management/user.service'
import { authenticate } from '../../middlewares/authenticaton'
import { userHasAdminAccess } from '../../middlewares/admin-access'
import { parseDateRange } from '../../utils'

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
        async (request, reply) => {
            const { userId } = request.params as { userId: string }
            const { from, to } = request.query as {
                from: string
                to: string
            }
            if (typeof from !== 'string' || typeof to !== 'string') {
                reply.status(400).send({ message: 'Invalid date range' })
                return
            }

            const dateRange = parseDateRange(from, to)

            if (!dateRange) {
                reply.status(400).send({ message: 'Invalid date range' })
                return
            }
            const balanceHistory = fetchUserBalanceHistory(
                userId,
                dateRange.from,
                dateRange.to,
            )
            return { balanceHistory }
        },
    )
}
