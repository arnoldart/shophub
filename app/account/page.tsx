"use client"

import { useState } from "react"
import { User, Package, Heart, LogOut, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice, formatDate } from "@/lib/utils"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: new Date("2024-01-15"),
      status: "Delivered",
      total: 1899000,
      items: 2,
    },
    {
      id: "ORD-002",
      date: new Date("2024-01-10"),
      status: "Shipped",
      total: 4999000,
      items: 1,
    },
    {
      id: "ORD-003",
      date: new Date("2024-01-05"),
      status: "Processing",
      total: 299000,
      items: 3,
    },
  ]

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100"
      case "Shipped":
        return "text-blue-600 bg-blue-100"
      case "Processing":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <User className="h-24 w-24 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 mb-6">Silakan login untuk mengakses dashboard</p>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Selamat datang kembali, {user.name}!</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="orders">Pesanan</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informasi Profil</CardTitle>
                  <CardDescription>Kelola informasi pribadi Anda</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Batal" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex space-x-2">
                  <Button onClick={handleSaveProfile}>Simpan</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Batal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pesanan</CardTitle>
              <CardDescription>Lihat semua pesanan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Package className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.date)} • {order.items} item
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(order.total)}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Produk yang Anda simpan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Belum ada produk di wishlist</p>
                <Button className="mt-4" asChild>
                  <a href="/products">Mulai Belanja</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Akun</CardTitle>
              <CardDescription>Kelola preferensi dan keamanan akun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Notifikasi Email</p>
                  <p className="text-sm text-gray-500">Terima update pesanan via email</p>
                </div>
                <Button variant="outline" size="sm">
                  Aktif
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Ubah Password</p>
                  <p className="text-sm text-gray-500">Update password akun Anda</p>
                </div>
                <Button variant="outline" size="sm">
                  Ubah
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Hapus Akun</p>
                  <p className="text-sm text-gray-500">Hapus akun secara permanen</p>
                </div>
                <Button variant="destructive" size="sm">
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
