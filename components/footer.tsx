import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">SH</span>
              </div>
              <span className="font-bold text-xl">ShopHub</span>
            </div>
            <p className="text-gray-300 text-sm">
              Platform e-commerce terpercaya untuk semua kebutuhan belanja online Anda.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-gray-300 hover:text-white">
                  Elektronik
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="text-gray-300 hover:text-white">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/home" className="text-gray-300 hover:text-white">
                  Rumah & Taman
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Bantuan
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white">
                  Info Pengiriman
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kontak</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">support@shophub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopHub. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
