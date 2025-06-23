import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import type { Product } from "@/types"

interface ProductSectionProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

export default function ProductSection({ title, products, viewAllLink }: ProductSectionProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Button variant="outline" asChild>
            <Link href={viewAllLink}>Lihat Semua</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
