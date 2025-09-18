"use client";

import { useEffect, useState } from "react";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "@/services/address.service";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      setLoading(true);
      const res = await getAddresses();
      setAddresses(res.data); // الـ API بيرجع {data: []}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    await addAddress({
      name: "Home",
      details: "Home details",
      phone: "01010700700",
      city: "Gizaa",
    });
    loadAddresses();
  }

  async function handleDelete(id: string) {
    await deleteAddress(id);
    loadAddresses();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Addresses</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Address
      </button>

      <ul className="space-y-3">
        {addresses.length === 0 && <p>No addresses found</p>}
        {addresses.map((addr) => (
          <li
            key={addr._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p>{addr.city}</p>
              <p>{addr.phone}</p>
            </div>
            <button
              onClick={() => handleDelete(addr._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
