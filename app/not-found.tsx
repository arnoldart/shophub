import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <Search className="h-4 w-4 mr-2" />
              Lihat Produk
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
