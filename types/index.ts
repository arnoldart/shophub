export interface Product {
  id: string
  name: string
  slug: string
  price: number
  discount: number
  image: string
  images: string[]
  description: string
  category: string
  brand: string
  rating: number
  reviews: number
  stock: number
  variants?: {
    color?: string[]
    size?: string[]
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
  selectedVariants?: {
    color?: string
    size?: string
  }
}
