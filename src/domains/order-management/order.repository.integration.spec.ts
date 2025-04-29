import { database } from '../../db'
import {
    findOrders,
    findOrderById,
    insertOrder,
    findOrdersByUserId,
    updateOrderById,
    deleteOrderById,
} from './order.repository'
import type { Order, Product } from './order.types'

describe('order.repository integration', () => {
    let initialOrders: Order[]

    beforeAll(() => {
        jest.useFakeTimers()
    })

    beforeEach(() => {
        initialOrders = [...database.orders]
    })

    afterEach(() => {
        database.orders = [...initialOrders]
    })

    describe('#findOrders', () => {
        it('should return all orders', () => {
            const result = findOrders()
            expect(result).toEqual(initialOrders)
        })

        describe('when orders are empty', () => {
            beforeEach(() => {
                database.orders = []
            })

            it('should return empty array', () => {
                const result = findOrders()
                expect(result).toEqual([])
            })
        })
    })

    describe('#findOrderById', () => {
        let orderId: number
        describe('when order exists', () => {
            beforeEach(() => {
                orderId = 1
            })

            it('should find the right order', () => {
                const result = findOrderById(orderId)
                expect(result).toEqual(
                    expect.objectContaining({
                        id: orderId,
                        userId: 'user1',
                        products: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String),
                                price: expect.any(Number),
                                count: expect.any(Number),
                            }),
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String),
                                price: expect.any(Number),
                                count: expect.any(Number),
                            }),
                        ]),
                        createdAt: expect.any(Date),
                    }),
                )
            })
        })

        describe('when order does not exist', () => {
            beforeEach(() => {
                orderId = 999
            })

            it('should return undefined', () => {
                const result = findOrderById(orderId)
                expect(result).toBeUndefined()
            })
        })
    })

    describe('#findOrdersByUserId', () => {
        let userId: string

        describe('when user has orders', () => {
            beforeEach(() => {
                userId = 'user1'
            })

            it('should return all user orders', () => {
                const result = findOrdersByUserId(userId)
                expect(result).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            userId,
                            products: expect.any(Array),
                            createdAt: expect.any(Date),
                        }),
                    ]),
                )
            })
        })

        describe('when user has no orders', () => {
            beforeEach(() => {
                userId = 'nonexistent-user'
            })

            it('should return empty array', () => {
                const result = findOrdersByUserId(userId)
                expect(result).toEqual([])
            })
        })
    })

    describe('#insertOrder', () => {
        let newProducts: Product[]
        let userId: string

        beforeEach(() => {
            userId = 'user1'
            newProducts = [
                { id: 100, name: 'Test Product', price: 9.99, count: 2 },
            ]
        })

        it('should create new order with correct data', () => {
            const result = insertOrder(userId, newProducts)
            const savedOrder = findOrderById(result.id)

            expect(savedOrder).toEqual({
                id: expect.any(Number),
                userId,
                products: newProducts,
                createdAt: expect.any(Date),
            })
        })

        it('should return the new order', () => {
            const result = insertOrder(userId, newProducts)

            expect(result).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    userId,
                    products: newProducts,
                    createdAt: expect.any(Date),
                }),
            )
        })
    })

    describe('#updateOrderById', () => {
        let orderId: number
        let updateData: { products: Product[] }
        describe('when order exists', () => {
            beforeEach(() => {
                orderId = 1
                updateData = {
                    products: [
                        {
                            id: 200,
                            name: 'Updated Product',
                            price: 19.99,
                            count: 1,
                        },
                    ],
                }
            })

            it('should update order with new data', () => {
                updateOrderById(orderId, updateData)
                const updatedOrder = findOrderById(orderId)
                expect(updatedOrder?.products).toEqual(updateData.products)
            })

            it('should return the updated order', () => {
                const result = updateOrderById(orderId, updateData)

                expect(result).toEqual(
                    expect.objectContaining({
                        id: orderId,
                        products: updateData.products,
                        createdAt: expect.any(Date),
                    }),
                )
            })
        })

        describe('when order does not exist', () => {
            beforeEach(() => {
                orderId = 999
            })

            it('should return undefined', () => {
                const result = updateOrderById(orderId, { products: [] })
                expect(result).toBeUndefined()
            })
        })
    })

    describe('#deleteOrderById', () => {
        let orderId: number

        describe('when order exists', () => {
            beforeEach(() => {
                orderId = 1
            })

            it('should delete the order', () => {
                const result = deleteOrderById(orderId)

                expect(result).toBe(true)
                expect(findOrderById(orderId)).toBeUndefined()
            })
        })

        describe('when order does not exist', () => {
            beforeEach(() => {
                orderId = 999
            })

            it('should return false', () => {
                const result = deleteOrderById(orderId)
                expect(result).toBe(false)
            })
        })
    })
})
