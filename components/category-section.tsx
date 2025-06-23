import Link from "next/link"
import { Smartphone, Shirt, Home, Gamepad2, Book, Car } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Elektronik",
    slug: "electronics",
    icon: Smartphone,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Rumah & Taman",
    slug: "home",
    icon: Home,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Buku",
    slug: "books",
    icon: Book,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Otomotif",
    slug: "automotive",
    icon: Car,
    color: "bg-red-100 text-red-600",
  },
]

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Kategori Produk</h2>
        <p className="text-gray-600">Temukan produk sesuai kebutuhan Anda</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
