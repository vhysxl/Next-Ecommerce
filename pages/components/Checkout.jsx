import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch(
            `/api/cart?consumentId=${session.user._id}`
          );
          const data = await response.json();

          if (response.ok) {
            setCart(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError("Failed to fetch cart");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [session, status]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRes = await fetch("/api/product");
        if (!productsRes.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (cart && products.length > 0) {
      const calculateTotalPrice = () => {
        const total = cart.items.reduce((acc, item) => {
          const product = products.find((p) => p._id === item.product);
          return acc + (product ? product.price * item.quantity : 0);
        }, 0);
        setTotalPrice(total);
      };

      calculateTotalPrice();
    }
  }, [cart, products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return <div>Please log in to proceed to checkout.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 text-black">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
              />
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="mt-4">
              <label
                htmlFor="cardNumber"
                className="block text-gray-700 font-semibold"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-gray-700 font-semibold"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-gray-700 font-semibold"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4">
              <ul>
                {cart &&
                  cart.items.map((item, index) => {
                    const product = products.find(
                      (p) => p._id === item.product
                    );
                    return (
                      <li key={index} className="flex justify-between py-2">
                        <span>{product ? product.title : "Unknown"}</span>
                        <span>
                          {item.quantity} x ${product ? product.price : "N/A"}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
