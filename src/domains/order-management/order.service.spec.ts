import { findOrders } from './order.repository'
import { fetchOrders } from './order.service'
import { Order } from './order.types'

jest.mock('./order.repository')

const mockFindOrders = jest.mocked(findOrders)

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
})
