import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function Myorder() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch(
            `/api/order?consumentId=${session.user._id}`
          );
          const data = await response.json();

          if (response.ok) {
            setOrders(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError("Failed to fetch orders");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return <div>Please log in to view your orders.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-5 font-sans w-3/4">
        <h1 className="text-2xl mb-5">My Orders</h1>
        {orders.length === 0 && <p>You have no orders.</p>}
        {orders.length > 0 && (
          <ul className="list-none">
            {orders.map((order) => (
              <li key={order._id} className="py-2 border-b border-gray-200">
                <h2 className="text-xl font-bold">Order #{order._id}</h2>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                </p>
                <h3 className="text-lg mt-3">Items:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-1"
                    >
                      <div className="flex items-center">
                        {item.product.images &&
                          item.product.images.length > 0 && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              className="w-12 h-12 mr-4"
                            />
                          )}
                        <span>{item.product.title}</span>
                      </div>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.product.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  <strong>Shipping Address:</strong>{" "}
                  {order.shippingAddress.name}, {order.shippingAddress.address}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
