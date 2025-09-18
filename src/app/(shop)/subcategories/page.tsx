"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSubcategoriesByCategory } from "@/services/subcategory.service";

interface Subcategory {
  _id: string;
  name: string;
  description?: string;
}

interface SubcategoriesPageProps {
  params: { categoryId: string };
}

export default function SubcategoriesPage({ params }: SubcategoriesPageProps) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await getSubcategoriesByCategory(params.categoryId);
        setSubcategories(res.data || []);
      } catch (err) {
        console.error(err);
        setSubcategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategories();
  }, [params.categoryId]);

  if (loading) return <p>Loading...</p>;
  if (subcategories.length === 0) return <p>No subcategories found.</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subcategories.map((sub) => (
          <li key={sub._id} className="border p-4 rounded hover:shadow">
            <Link href={`/subcategories/${sub._id}`} className="font-semibold text-lg">
              {sub.name}
            </Link>
            {sub.description && <p className="text-sm mt-1">{sub.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
