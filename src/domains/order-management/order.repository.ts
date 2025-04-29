import type { Order, Product } from './order.types'
import { database } from '../../db'

export function findOrders(): Order[] {
    return database.orders
}

export function findOrderById(id: number): Order | undefined {
    return database.orders.find(order => order.id === id)
}

export function insertOrder(userId: string, products: Product[]): Order {
    const newOrder: Order = {
        id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        products,
        userId,
        createdAt: new Date(),
    }
    database.orders.push(newOrder)
    return newOrder
}

export function updateOrderById(
    id: number,
    updatedOrder: Partial<Order>,
): Order | undefined {
    const order = database.orders.find(order => order.id === id)
    if (!order) {
        return
    }
    Object.assign(order, updatedOrder)
    return order
}

export function deleteOrderById(id: number): boolean {
    const orderIndex = database.orders.findIndex(order => order.id === id)
    if (orderIndex !== -1) {
        database.orders.splice(orderIndex, 1)
        return true
    }
    return false
}

export function findOrdersByUserId(userId: string): Order[] {
    return database.orders.filter(order => order.userId === userId)
}

export function findProductsSumByUserId(userId: string): number {
    const orders = findOrdersByUserId(userId)
    return Number(
        orders
            .flatMap(order => order.products)
            .reduce((acc, product) => acc + product.price * product.count, 0)
            .toFixed(2),
    )
}
