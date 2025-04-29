import { findUserById } from './user.repository'
import { calculateOrdersSumByUserId } from '../order-management/order.service'
import { calculateUserBalance } from './user.service'
import type { User } from './user.types'

jest.mock('./user.repository')
jest.mock('../order-management/order.service')

const mockFindUserById = jest.mocked(findUserById)
const mockCalculateOrdersSumByUserId = jest.mocked(calculateOrdersSumByUserId)

describe('user.service', () => {
    describe('#calculateUserBalance', () => {
        let user: User
        const userId = 'user123'

        beforeEach(() => {
            user = {
                id: userId,
                name: 'Test User',
                balance: 100.0,
            }
            mockFindUserById.mockReturnValue(user)
            mockCalculateOrdersSumByUserId.mockReturnValue(40.0)
        })

        afterEach(() => {
            jest.resetAllMocks()
        })

        describe('when user exists', () => {
            it('should call findUserById repository method', () => {
                calculateUserBalance(userId)
                expect(mockFindUserById).toHaveBeenCalledWith(userId)
            })

            it('should call calculateOrdersSumByUserId method', () => {
                calculateUserBalance(userId)
                expect(mockCalculateOrdersSumByUserId).toHaveBeenCalledWith(
                    userId,
                )
            })

            it('should calculate correct balance', () => {
                const result = calculateUserBalance(userId)
                expect(result).toBe(60.0)
            })

            describe('when orders sum is 0', () => {
                beforeEach(() => {
                    mockCalculateOrdersSumByUserId.mockReturnValue(0)
                })

                it('should return full balance', () => {
                    const result = calculateUserBalance(userId)
                    expect(result).toBe(100.0)
                })
            })

            describe('when resulting balance would be negative', () => {
                beforeEach(() => {
                    mockCalculateOrdersSumByUserId.mockReturnValue(150.0)
                })

                it('should throw an error', () => {
                    expect(() => calculateUserBalance(userId)).toThrow(
                        'The balance is negative',
                    )
                })
            })
        })

        describe('when user does not exist', () => {
            beforeEach(() => {
                mockFindUserById.mockReturnValue(undefined)
            })

            it('should throw an error', () => {
                expect(() => calculateUserBalance(userId)).toThrow(
                    'The user not found',
                )
            })
        })

        describe('when database operation fails', () => {
            beforeEach(() => {
                mockFindUserById.mockImplementation(() => {
                    throw new Error('Database error')
                })
            })

            it('should propagate the error', () => {
                expect(() => calculateUserBalance(userId)).toThrow(
                    'Database error',
                )
            })
        })
    })
})
