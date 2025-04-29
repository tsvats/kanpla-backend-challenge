export type User = {
    id: string
    name: string
    balance: number
}

export type UserBalanceHistory = {
    date: Date
    userId: string
    balance: number
}
