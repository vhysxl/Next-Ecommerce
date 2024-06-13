import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Link from "next/link";

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
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

  const handleQuantityChange = (itemIndex, newQuantity) => {
    if (cart) {
      const updatedItems = [...cart.items];
      updatedItems[itemIndex].quantity = newQuantity;
      setCart({ ...cart, items: updatedItems });
    }
  };

  const handleRemoveProduct = (itemIndex) => {
    if (cart) {
      const updatedItems = [...cart.items];
      updatedItems.splice(itemIndex, 1);
      setCart({ ...cart, items: updatedItems });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-5 font-sans w-3/4">
        <h1 className="text-2xl mb-5">Cart</h1>
        {cart && cart.items.length === 0 && <p>Your cart is empty.</p>}
        {cart && cart.items.length > 0 && (
          <ul className="list-none">
            {cart.items.map((item, index) => {
              const product = products.find((p) => p._id === item.product);
              return (
                <li
                  key={index}
                  className="py-2 border-b border-gray-200 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    {product && product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 mr-4"
                      />
                    )}
                    <span>Product: {product ? product.title : "Unknown"}</span>
                  </div>
                  <span>
                    Quantity:{" "}
                    <input 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                      className="w-12 mx-2 text-center text-black"
                    />
                  </span>
                  <span>Price: ${product ? product.price : "N/A"}</span>
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <h2 className="mt-5 text-xl font-bold">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        <div>
          <Link href="/components/Checkout">
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
