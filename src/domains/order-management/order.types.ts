export type Order = {
    id: number
    userId: string
    products: Product[]
    createdAt: Date
}

export type Product = {
    id: number
    name: string
    price: number
    count: number
}
