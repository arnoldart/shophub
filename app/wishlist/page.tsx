"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { getProducts } from "@/lib/data"

export default function WishlistPage() {
  // Mock wishlist - in real app, this would come from context/state management
  const [wishlistItems] = useState(getProducts().slice(0, 4))

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Wishlist Kosong</h1>
          <p className="text-gray-600 mb-6">Belum ada produk yang Anda simpan</p>
          <Button asChild>
            <Link href="/products">Mulai Belanja</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Wishlist Saya</h1>
        <p className="text-gray-600">{wishlistItems.length} produk disimpan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
