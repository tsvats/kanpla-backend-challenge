import { FastifyInstance } from 'fastify'

import { Order } from './order.types'
import {
    fetchOrders,
    fetchOrderById,
    fetchOrderTotal,
    createOrder,
    updateOrder,
    deleteOrder,
} from './order.service'

export default async function orderRoutes(server: FastifyInstance) {
    server.get('/', async () => {
        return fetchOrders()
    })

    server.get('/:id', async request => {
        const { id } = request.params as { id: string }
        const order = fetchOrderById(parseInt(id, 10))
        return { order }
    })

    server.get('/:id/order-total', async request => {
        const { id } = request.params as { id: string }
        const total = fetchOrderTotal(parseInt(id, 10))
        return { total }
    })

    server.post('/', async (request, reply) => {
        const { userId, products } = request.body as Order
        const order = createOrder(userId, products)

        reply.status(201).send({ order })
    })

    server.put('/:id', async request => {
        const { id } = request.params as { id: string }
        const updatedOrder = request.body as Partial<Order>
        const order = updateOrder(parseInt(id, 10), updatedOrder)
        return { order }
    })

    server.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const success = deleteOrder(parseInt(id, 10))
        if (success) {
            return reply.status(204).send()
        }
        return reply.status(404).send({ message: 'Order not found' })
    })
}
