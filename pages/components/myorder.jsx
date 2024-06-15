import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import mongoose from "mongoose";

export default function Myorder() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

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
          console.error("error");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await fetch("/api/product"); // Correct API route
        if (!productRes.ok) {
          throw new Error("Failed to fetch products");
        }
        const productData = await productRes.json();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return <div>Please log in to view your orders.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 && <p>You have no orders.</p>}
      {orders.length > 0 && (
        <ul className="list-none">
          {orders.map((order) => (
            <li
              key={order._id}
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <h2 className="text-xl font-bold mb-2">Order #{order._id}</h2>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <h3 className="text-lg font-bold mb-2">Items:</h3>
              <ul className="list-disc pl-4">
                {order.items.map((item, index) => {
                  const product = products.find((p) => p._id === item.product);
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center">
                        {product &&
                          product.images &&
                          product.images.length > 0 && (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-12 h-12 mr-4 object-cover"
                            />
                          )}
                        <span>{product ? product.title : "Unknown"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">Quantity: {item.quantity}</span>
                        <span>Price: ${product ? product.price : "N/A"}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3">
                <strong>Shipping Address:</strong> {order.shippingAddress.name},{" "}
                {order.shippingAddress.address}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
