import {
    insertOrder,
    findOrdersByUserId,
    findOrderById,
    findOrders,
    deleteOrderById,
    updateOrderById,
} from './order.repository'
import { Order, Product } from './order.types'

export function fetchOrders(): Order[] {
    return findOrders()
}

export function fetchOrderById(id: number): Order {
    const order = findOrderById(id)

    if (!order) {
        throw new Error('Order not found')
    }

    return order
}

export function createOrder(userId: string, products: Product[]): Order {
    return insertOrder(userId, products)
}

export function fetchOrdersByUserId(userId: string): Order[] {
    return findOrdersByUserId(userId)
}

export function fetchOrderTotal(id: number): number {
    const order = findOrderById(id)

    if (!order) {
        throw new Error('Order not found')
    }

    const total = order.products.reduce(
        (acc, product) => acc + product.price * product.count,
        0,
    )

    return total
}

export function updateOrder(
    id: number,
    order: Partial<Order>,
): Order | undefined {
    return updateOrderById(id, order)
}

export function deleteOrder(id: number): boolean {
    return deleteOrderById(id)
}
