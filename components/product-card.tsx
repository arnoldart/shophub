"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{formatPrice(product.price * (1 - product.discount / 100))}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>

        <Button size="sm" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </CardContent>
    </Card>
  )
}
