"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchProducts } from "@/lib/data"
import type { Product } from "@/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const searchResults = searchProducts(query)
      setResults(searchResults)
      setIsLoading(false)
    }, 300)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      // Update URL
      window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Mencari..." : "Cari"}
          </Button>
        </form>
      </div>

      {initialQuery && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hasil pencarian untuk "{initialQuery}"</h1>
          <p className="text-gray-600">Ditemukan {results.length} produk</p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Mencari produk...</p>
        </div>
      ) : results.length === 0 && initialQuery ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Tidak ada hasil ditemukan</h2>
          <p className="text-gray-600 mb-4">Coba gunakan kata kunci yang berbeda atau lebih umum</p>
          <Button onClick={() => setSearchQuery("")}>Hapus Pencarian</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
