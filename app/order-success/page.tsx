"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Truck, CreditCard, Home, ShoppingBag, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/stores"
import { formatPrice } from "@/lib/utils"

interface OrderItem {
  id: string
  name: string
  price: number
  discount: number
  quantity: number
  image: string
}

interface OrderDetails {
  id: string
  orderNumber: string
  date: string
  status: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingMethod: string
  paymentMethod: string
  shippingAddress: {
    fullName: string
    address: string
    city: string
    province: string
    postalCode: string
    phone: string
  }
}

export default function OrderSuccessPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching order details
    // In a real app, you would get the order ID from URL params or localStorage
    const mockOrderDetails: OrderDetails = {
      id: "ord_" + Math.random().toString(36).substr(2, 9),
      orderNumber: "#SH" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "confirmed",
      items: [
        {
          id: "1",
          name: "iPhone 15 Pro Max",
          price: 15000000,
          discount: 10,
          quantity: 1,
          image: "/placeholder.svg"
        },
        {
          id: "2", 
          name: "AirPods Pro 2nd Gen",
          price: 3500000,
          discount: 5,
          quantity: 1,
          image: "/placeholder.svg"
        }
      ],
      subtotal: 17325000,
      shippingCost: 25000,
      total: 17350000,
      shippingMethod: "Express (1-2 hari)",
      paymentMethod: "Kartu Kredit",
      shippingAddress: {
        fullName: user?.name || "Customer",
        address: "Jl. Sudirman No. 123, Menteng",
        city: "Jakarta Pusat",
        province: "DKI Jakarta",
        postalCode: "10310",
        phone: "+62 812 3456 7890"
      }
    }

    setTimeout(() => {
      setOrderDetails(mockOrderDetails)
      setIsLoading(false)
    }, 1000)
  }, [user])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Memproses pesanan Anda...</p>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Order tidak ditemukan</p>
        <Button asChild className="mt-4">
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
        <p className="text-gray-600">
          Terima kasih atas pesanan Anda. Kami akan segera memproses pesanan Anda.
        </p>
        <div className="mt-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {orderDetails.orderNumber}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Status Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-green-600">Dikonfirmasi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="ml-3 text-sm text-gray-400">Diproses</span>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                    </div>
                    <span className="ml-3 text-sm text-gray-400">Dikirim</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{orderDetails.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.items.map((item) => {
                  const discountedPrice = item.price * (1 - item.discount / 100)
                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(discountedPrice)}
                          </span>
                          {item.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatPrice(discountedPrice * item.quantity)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Alamat Pengiriman:</p>
                  <p className="text-sm text-gray-600">{orderDetails.shippingAddress.fullName}</p>
                  <p className="text-sm text-gray-600">{orderDetails.shippingAddress.address}</p>
                  <p className="text-sm text-gray-600">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.province} {orderDetails.shippingAddress.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{orderDetails.shippingAddress.phone}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-900">Metode Pengiriman:</p>
                  <p className="text-sm text-gray-600">{orderDetails.shippingMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Informasi Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm font-medium text-gray-900">Metode Pembayaran:</p>
                <p className="text-sm text-gray-600">{orderDetails.paymentMethod}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Pembayaran Berhasil
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(orderDetails.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongkos Kirim</span>
                  <span>{formatPrice(orderDetails.shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(orderDetails.total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan Pesanan
                </Button>
                <Separator />
                <Button asChild className="w-full">
                  <Link href="/account">
                    <Package className="h-4 w-4 mr-2" />
                    Lacak Pesanan
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Lanjut Belanja
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Kembali ke Beranda
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600 mb-3">
                  Jika Anda memiliki pertanyaan tentang pesanan ini, silakan hubungi customer service kami.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Hubungi Customer Service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
