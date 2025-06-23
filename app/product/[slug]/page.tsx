"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProductBySlug } from "@/lib/data"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const discountedPrice = product.price * (1 - product.discount / 100)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount > 0 && <Badge className="absolute top-4 left-4 bg-red-500">-{product.discount}%</Badge>}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} ulasan)
                </span>
              </div>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
              {product.discount > 0 && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.price)}</span>
              )}
            </div>
            {product.discount > 0 && (
              <p className="text-green-600 font-medium">Hemat {formatPrice(product.price - discountedPrice)}</p>
            )}
          </div>

          {/* Variants */}
          {product.variants?.color && (
            <div>
              <label className="block text-sm font-medium mb-2">Warna</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.color.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.size && (
            <div>
              <label className="block text-sm font-medium mb-2">Ukuran</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.size.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Jumlah</label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-500">Stok: {product.stock}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Tambah ke Keranjang
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="lg">
                Beli Sekarang
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Gratis Ongkir</p>
              <p className="text-xs text-gray-500">Min. Rp 100k</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Garansi Resmi</p>
              <p className="text-xs text-gray-500">1 Tahun</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-sm font-medium">Mudah Retur</p>
              <p className="text-xs text-gray-500">7 Hari</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Deskripsi Produk</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
