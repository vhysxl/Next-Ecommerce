import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "./Footer";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity < 1) return;

    const updatedCart = { ...cart };
    updatedCart.items[index].quantity = quantity;

    setCart(updatedCart);

    const calculateTotalPrice = () => {
      const total = updatedCart.items.reduce((acc, item) => {
        const product = products.find((p) => p._id === item.product);
        return acc + (product ? product.price * item.quantity : 0);
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  };

  const handleRemoveProduct = async (index) => {
    if (!session) {
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consumentId: session.user._id,
          productId: cart.items[index].product,
          action: "remove",
        }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        const calculateTotalPrice = () => {
          const total = updatedCart.items.reduce((acc, item) => {
            const product = products.find((p) => p._id === item.product);
            return acc + (product ? product.price * item.quantity : 0);
          }, 0);
          setTotalPrice(total);
        };
        calculateTotalPrice();
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Failed to remove product from cart");
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.name || !shippingAddress.address) {
      alert("Please fill in the shipping address");
      return;
    }

    const order = {
      consumentId: session.user._id,
      items: cart.items,
      shippingAddress,
      totalPrice,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        // Clear the cart after successful order placement
        setCart({ ...cart, items: [] });
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Failed to place order");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-black text-2xl text-center bg-white">
        <div>
          <h1>Memuat Cart</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mx-auto mt-4 animate-spin" // Center the SVG and add some margin-top
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z" />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return(
      <div className="overflow-hidden">
        <Navbar/>
        <div className="bg-white min-h-screen flex flex-row text-black text-center justify-center items-center"> 
          <h1 className="text-2xl">Tolong login terlebih dahulu untuk melihat cart</h1>
        </div>
        <Footer/>
      </div>
    )
  }

  return (
    <>
    <div className="overflow-hidden">
      <Navbar />
    </div>
      
      <div className="p-5 font-sans bg-white text-black">
        <h1 className="text-2xl mb-5">Cart</h1>
        {cart && cart.items.length === 0 && <p>Cart anda kosong</p>}
        {cart && cart.items.length > 0 && (
          <ul className="list-none">
            {cart.items.map((item, index) => {
              const product = products.find((p) => p._id === item.product);
              return (
                <li
                  key={index}
                  className="py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center"
                >
                  <div className="flex items-center mb-2 sm:mb-0 sm:w-1/3">
                    {product && product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-12 h-12 mr-4"
                      />
                    )}
                    <span className="truncate">
                      {product ? product.title : "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-0 sm:w-1/3 sm:justify-center">
                    <span className="mr-2">Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                      className="w-16 text-center text-black border rounded p-1"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-1/3 sm:justify-end">
                    <span className="mr-4">
                      Harga satuan: Rp{product ? product.price : "N/A"}
                    </span>
                    <button
                      onClick={() => handleRemoveProduct(index)}
                      className="p-1"
                    >
                      <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                      >
                        <path
                          d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <h2 className="mt-5 text-xl font-bold">
          Total Price: Rp{totalPrice.toFixed(2)}
        </h2>
        <div className="mt-4">
          <Link
            href="/components/Checkout"
            className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Checkout
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}
