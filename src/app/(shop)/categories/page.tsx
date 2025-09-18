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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: any) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="border rounded-lg p-4 hover:shadow transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={200}
              height={150}
              className="object-cover rounded mb-3"
            />
            <h2 className="text-lg font-medium">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
