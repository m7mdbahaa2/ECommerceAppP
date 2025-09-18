import Link from "next/link";
import Image from "next/image";

async function getCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: any) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-fit"
              />
            </div>
            <h2 className="text-lg font-medium text-center py-2">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
