import { calculateOrdersSumByUserId } from '../order-management/order.service'
import { findUserById } from './user.repository'

export function calculateUserBalance(userId: string) {
    const user = findUserById(userId)
    if (!user) {
        throw new Error('The user not found')
    }
    const balance = user.balance - calculateOrdersSumByUserId(userId)
    if (balance < 0) {
        throw new Error('The balance is negative')
    }
    return Number(balance.toFixed(2))
}
