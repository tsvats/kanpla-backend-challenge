// mockDatabase.ts

import { seededOrders, seededUsers } from './db'
import { User } from './types'

let database = {
    orders: seededOrders,
    users: seededUsers,
}

let currentId = 1

export const getUsers = (): User[] => database.users

export const getUserById = (id: string): User | undefined =>
    database.users.find(user => user.id === id)

export const createUser = (name: string, balance: number = 0): User => {
    const newUser: User = {
        id: `user${currentId++}`,
        name,
        balance,
    }
    database.users.push(newUser)
    return newUser
}

export const updateUser = (
    id: string,
    updatedUser: Partial<User>,
): User | undefined => {
    const user = database.users.find(user => user.id === id)
    if (user) {
        Object.assign(user, updatedUser)
        return user
    }
    return undefined
}

export const deleteUser = (id: string): boolean => {
    const userIndex = database.users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
        database.users.splice(userIndex, 1)
        return true
    }
    return false
}
