import type { User } from './user.types'
import { database } from '../../db'

export const findUsers = (): User[] => database.users

export const findUserById = (id: string): User | undefined =>
    database.users.find(user => user.id === id)

export const inseryUser = (name: string, balance: number = 0): User => {
    const newUser: User = {
        id: `user${Math.floor(Math.random() * (100 - 10 + 1)) + 10}`,
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
    if (!user) {
        return undefined
    }
    Object.assign(user, updatedUser)
    return user
}

export const deleteUser = (id: string): boolean => {
    const userIndex = database.users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
        database.users.splice(userIndex, 1)
        return true
    }
    return false
}
