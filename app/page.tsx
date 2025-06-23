import HeroSection from "@/components/hero-section"
import CategorySection from "@/components/category-section"
import ProductSection from "@/components/product-section"
import { getProducts } from "@/lib/data"

export default function HomePage() {
  const featuredProducts = getProducts().slice(0, 8)
  const newProducts = getProducts().slice(8, 16)
  const saleProducts = getProducts()
    .filter((p) => p.discount > 0)
    .slice(0, 8)

  return (
    <div className="space-y-12">
      <HeroSection />
      <CategorySection />
      <ProductSection title="Produk Unggulan" products={featuredProducts} />
      <ProductSection title="Produk Terbaru" products={newProducts} />
      {saleProducts.length > 0 && <ProductSection title="Diskon & Promo" products={saleProducts} />}
    </div>
  )
}
