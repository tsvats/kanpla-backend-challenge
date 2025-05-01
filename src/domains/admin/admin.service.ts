import { calculateTotalSpentAfterSpecificDate } from '../order-management/order.service'
import { fetchUserById } from '../user-management/user.service'

export function calculateUserBalanceByOrderHistory(
    userId: string,
    date: Date,
): number {
    const user = fetchUserById(userId)
    const totalSpent = calculateTotalSpentAfterSpecificDate(userId, date)
    return Number((user.balance - totalSpent).toFixed(2))
}
