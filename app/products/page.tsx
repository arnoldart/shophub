"use client"

import { useState, useMemo } from "react"
import { getProducts } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function ProductsPage() {
  const [products] = useState(getProducts())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const categories = ["all", "electronics", "fashion", "home", "gaming", "books", "automotive"]
  const brands = [...new Set(products.map((p) => p.brand))]

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        // Keep original order for newest
        break
    }

    return filtered
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, selectedBrands])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("newest")
    setPriceRange([0, 50000000])
    setSelectedBrands([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Filter</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Hapus Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Cari Produk</label>
                <Input
                  placeholder="Nama produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Kategori</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="electronics">Elektronik</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home">Rumah & Taman</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="books">Buku</SelectItem>
                    <SelectItem value="automotive">Otomotif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Rentang Harga: Rp {priceRange[0].toLocaleString()} - Rp {priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000000}
                  step={100000}
                  className="mt-2"
                />
              </div>

              {/* Brands */}
              <div>
                <label className="text-sm font-medium mb-2 block">Brand</label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded"
                      />
                      <label htmlFor={brand} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 || selectedCategory !== "all") && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Filter Aktif</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedCategory}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                      </Badge>
                    )}
                    {selectedBrands.map((brand) => (
                      <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                        {brand}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Semua Produk ({filteredProducts.length})</h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
              <Button onClick={clearFilters} className="mt-4">
                Hapus Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
