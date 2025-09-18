import Link from "next/link";
import Image from "next/image";
import { getUserToken } from "@/lib/server.utils";

interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

const fallbackBrands: Brand[] = [
  { _id: "1", name: "Brand One", image: "/placeholder.png" },
  { _id: "2", name: "Brand Two", image: "/placeholder.png" },
  { _id: "3", name: "Brand Three", image: "/placeholder.png" },
  { _id: "4", name: "Brand Four", image: "/placeholder.png" },
];

export default async function BrandsPage() {
  let brands: Brand[] = [];

  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`, {
      headers: token ? { token } : {},
      cache: "no-store",
    });

    const data = await res.json();
    if (res.ok && data.data) {
      brands = data.data;
    } else {
      brands = fallbackBrands;
    }
  } catch (error) {
    console.error(error);
    brands = fallbackBrands;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">All Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="p-4 border rounded-lg flex flex-col items-center gap-2 hover:shadow-lg transition"
          >
            {brand.image && (
              <Image
                src={brand.image}
                alt={brand.name}
                width={128}
                height={128}
                className="object-contain rounded-lg"
              />
            )}
            <h2 className="font-semibold">{brand.name}</h2>
            {brand.description && (
              <p className="text-center text-sm">{brand.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
