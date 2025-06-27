"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import EmptyState from "@/components/empty-state"
import { useCartStore } from "@/stores"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          image="/images/empty-states/empty-cart.png"
          title="Keranjang Kosong"
          description="Belum ada produk di keranjang Anda. Mulai berbelanja dan temukan produk favorit!"
          actionText="Mulai Belanja"
          actionHref="/products"
        />
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const shippingCost = totalPrice >= 100000 ? 0 : 15000
  const finalTotal = totalPrice + shippingCost

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const discountedPrice = item.price * (1 - item.discount / 100)

            return (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug}`} className="hover:text-blue-600">
                        <h3 className="font-medium text-lg truncate">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-lg">{formatPrice(discountedPrice)}</span>
                        {item.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">{formatPrice(item.price)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(discountedPrice * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Kosongkan Keranjang
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Lanjut Belanja</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} item)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                </span>
              </div>

              {totalPrice < 100000 && (
                <p className="text-sm text-gray-600">
                  Belanja {formatPrice(100000 - totalPrice)} lagi untuk gratis ongkir!
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
