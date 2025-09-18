import { getUserToken } from "@/lib/server.utils";

type Order = {
  id: string;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  shippingAddress?: {
    city?: string;
    details?: string;
    phone?: string;
  };
};

export default async function AllOrdersPage() {
  const token = await getUserToken();

  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders`, {
    headers: {
      token: token as string,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="p-6">Failed to load orders</div>;
  }

  const orders: Order[] = await res.json();

  if (!orders.length) {
    return <div className="p-6">No orders found</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border rounded-lg p-4 shadow-sm space-y-2"
          >
            <p>
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-semibold">Total:</span> ${order.totalOrderPrice}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {order.isPaid ? "Paid" : "Unpaid"} |{" "}
              {order.isDelivered ? "Delivered" : "Not Delivered"}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.shippingAddress
                ? `${order.shippingAddress.city || "-"}, ${order.shippingAddress.details || "-"}, ${order.shippingAddress.phone || "-"}`
                : "No address provided"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
