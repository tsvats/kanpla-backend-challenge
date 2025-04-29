import type { Order, Product } from './order.types'
import { database } from '../../db'

export const findOrders = (): Order[] => database.orders

export const findOrderById = (id: number): Order | undefined =>
    database.orders.find(order => order.id === id)

export const insertOrder = (userId: string, products: Product[]): Order => {
    const newOrder: Order = {
        id: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
        products,
        userId,
        createdAt: new Date(),
    }
    database.orders.push(newOrder)
    return newOrder
}

export const updateOrderById = (
    id: number,
    updatedOrder: Partial<Order>,
): Order | undefined => {
    const order = database.orders.find(order => order.id === id)
    if (!order) {
        return
    }
    Object.assign(order, updatedOrder)
    return order
}

export const deleteOrderById = (id: number): boolean => {
    const orderIndex = database.orders.findIndex(order => order.id === id)
    if (orderIndex !== -1) {
        database.orders.splice(orderIndex, 1)
        return true
    }
    return false
}

export const findOrdersByUserId = (userId: string): Order[] =>
    database.orders.filter(order => order.userId === userId)
