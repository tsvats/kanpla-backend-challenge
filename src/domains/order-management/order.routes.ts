import { FastifyInstance } from 'fastify'
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../../mockDatabaseClient'
import { Order } from '../../types'

export default async function orderRoutes(server: FastifyInstance) {
    server.get('/', async () => {
        return getOrders()
    })

    server.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const order = getOrderById(parseInt(id, 10))

        if (order) {
            return order
        }

        reply.status(404).send({ message: 'Order not found' })
    })

    server.get('/:id/order-total', async (request, reply) => {
        const { id } = request.params as { id: string }
        const order = getOrderById(parseInt(id, 10))

        if (order) {
            const total = order.products.reduce(
                (acc, product) => acc + product.price * product.count,
                0,
            )

            return reply.status(201).send({
                total,
            })
        }

        reply.status(404).send({ message: 'Order not found' })
    })

    server.post('/', async (request, reply) => {
        const { userId, products } = request.body as Order

        const newOrder = createOrder(userId, products)

        reply.status(201).send(newOrder)
    })

    server.put('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const updatedOrder = request.body as Partial<Order>
        const order = updateOrder(parseInt(id, 10), updatedOrder)

        if (order) {
            return reply.status(201).send(order)
        }

        reply.status(404).send({ message: 'Order not found' })
    })

    server.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string }
        const success = deleteOrder(parseInt(id, 10))
        if (success) {
            reply.status(204).send()
        } else {
            reply.status(404).send({ message: 'Order not found' })
        }
    })
}
