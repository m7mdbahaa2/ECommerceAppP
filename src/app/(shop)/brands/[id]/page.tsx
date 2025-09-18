import { getUserToken } from "@/lib/server.utils";
import { notFound } from "next/navigation";

type Brand = {
  _id: string;
  name: string;
  description: string;
  image: string;
};

async function getBrand(id: string): Promise<Brand | null> {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("Not logged in");

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/brands/${id}`,
      {
        headers: { token },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Server response:", text);
      return null;
    }

    const data = await res.json();
    return data.data || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface PageProps {
  params: { id: string };
}

export default async function BrandPage({ params }: PageProps) {
  const brand = await getBrand(params.id);

  if (!brand) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Brand not found</h2>
        <p>البيانات غير متوفرة أو حدث خطأ في السيرفر</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{brand.name}</h1>
      {brand.image && (
        <img src={brand.image} alt={brand.name} className="w-full h-auto rounded-md" />
      )}
      <p>{brand.description}</p>
    </div>
  );
}
