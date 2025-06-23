import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Belanja Online
              <span className="block text-blue-400">Mudah & Aman</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Temukan ribuan produk berkualitas dengan harga terbaik. Gratis ongkir untuk pembelian di atas Rp 100.000
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Mulai Belanja</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/category/sale">Lihat Promo</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Hero Image"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
