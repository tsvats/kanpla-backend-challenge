import { findOrders, findOrderById } from './order.repository'
import { fetchOrders, fetchOrderTotal } from './order.service'
import type { Order } from './order.types'

jest.mock('./order.repository')

const mockFindOrders = jest.mocked(findOrders)
const mockFindOrderById = jest.mocked(findOrderById)

describe('order.service', () => {
    describe('#fetchOrders', () => {
        let orders: Order[]

        beforeEach(() => {
            orders = [
                {
                    id: 1,
                    userId: 'user123',
                    products: [
                        { id: 1, name: 'Product 1', price: 10.5, count: 2 },
                    ],
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    userId: 'user456',
                    products: [
                        { id: 2, name: 'Product 2', price: 20.25, count: 1 },
                    ],
                    createdAt: new Date(),
                },
            ]
            mockFindOrders.mockReturnValue(orders)
        })

        afterEach(() => {
            jest.resetAllMocks()
        })

        describe('when orders exist', () => {
            it('should call findOrders repository method', () => {
                fetchOrders()
                expect(mockFindOrders).toHaveBeenCalled()
            })

            it('should return all orders', () => {
                const result = fetchOrders()
                expect(result).toEqual(orders)
            })

            it('should return orders with correct structure', () => {
                const result = fetchOrders()
                expect(result).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            userId: expect.any(String),
                            products: expect.any(Array),
                            createdAt: expect.any(Date),
                        }),
                    ]),
                )
            })
        })

        describe('when no orders exist', () => {
            beforeEach(() => {
                mockFindOrders.mockReturnValue([])
            })

            it('should return empty array', () => {
                const result = fetchOrders()
                expect(result).toEqual([])
            })
        })

        describe('when database operation fails', () => {
            beforeEach(() => {
                mockFindOrders.mockImplementation(() => {
                    throw new Error('Database error')
                })
            })

            it('should propagate the error', () => {
                expect(() => fetchOrders()).toThrow('Database error')
            })
        })
    })

    describe('#fetchOrderTotal', () => {
        let order: Order

        beforeEach(() => {
            order = {
                id: 1,
                userId: 'user123',
                products: [
                    { id: 1, name: 'Product 1', price: 10.5, count: 2 },
                    { id: 2, name: 'Product 2', price: 20.25, count: 1 },
                ],
                createdAt: new Date(),
            }
            mockFindOrderById.mockReturnValue(order)
        })

        afterEach(() => {
            jest.resetAllMocks()
        })

        describe('when order exists', () => {
            it('should call findOrderById repository method', () => {
                fetchOrderTotal(order.id)
                expect(mockFindOrderById).toHaveBeenCalledWith(1)
            })

            it('should calculate correct total for multiple products', () => {
                const result = fetchOrderTotal(order.id)
                expect(result).toBe(41.25)
            })

            describe('when the price contains more than 2 decimal places', () => {
                beforeEach(() => {
                    order.products = [
                        { id: 1, name: 'Product 1', price: 4.32, count: 1 },
                        { id: 2, name: 'Product 2', price: 4.78, count: 1 },
                    ]
                })

                it('should round to 2 decimal places', () => {
                    const result = fetchOrderTotal(order.id)
                    expect(result).toBe(9.1)
                })
            })

            describe('when order has no products', () => {
                beforeEach(() => {
                    order.products = []
                    mockFindOrderById.mockReturnValue(order)
                })

                it('should return 0', () => {
                    const result = fetchOrderTotal(1)
                    expect(result).toBe(0)
                })
            })
        })

        describe('when order does not exist', () => {
            beforeEach(() => {
                mockFindOrderById.mockReturnValue(undefined)
            })

            it('should throw an error', () => {
                expect(() => fetchOrderTotal(999)).toThrow('Order not found')
            })
        })
    })
})
