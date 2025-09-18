"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSubcategoryById } from "@/services/subcategory.service";

interface Subcategory {
  _id: string;
  name: string;
  description?: string;
}

export default function SubcategoryDetailPage() {
  const params = useParams();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategory() {
      if (!params.id) {
        setSubcategory(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getSubcategoryById(params.id as string);
        setSubcategory(res.data || null);
      } catch (err) {
        console.error(err);
        setSubcategory(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategory();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!subcategory) return <p>Subcategory not found.</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">{subcategory.name}</h1>
      {subcategory.description && <p>{subcategory.description}</p>}
    </div>
  );
}
