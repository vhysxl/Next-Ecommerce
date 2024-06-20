import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

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

  const handlePlaceOrder = async () => {
    if (!shippingAddress.name || !shippingAddress.address) {
      alert("Tolong Isi semua data terlebih dahulu");
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
        router.push("/OrderSuccess");
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
          <h1>Memuat Checkout</h1>
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
    return <div>Please log in to proceed to checkout.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-neutral-600">
        <div className="p-5 font-sans  md:w-3/4 bg-white text-black flex flex-col">
          <h1 className="text-2xl mb-5">Checkout</h1>
          <h2 className="text-xl mb-3">Alamat Pengiriman</h2>
          <div className="mb-5">
            <input
              type="text"
              name="name"
              placeholder="Nama Penerima"
              value={shippingAddress.name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="address"
              placeholder="(Nama jalan, kelurahan, kecamatan, kota, Kode Pos)"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <h2 className="text-xl mb-3">Order Total</h2>
          {cart && cart.items.length > 0 && (
            <ul className="list-none mb-5">
              {cart.items.map((item, index) => {
                const product = products.find((p) => p._id === item.product);
                return (
                  <li
                    key={index}
                    className="py-2 border-b border-gray-200 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      {product &&
                        product.images &&
                        product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-12 h-12 mr-4"
                          />
                        )}
                      <span>
                        Product: {product ? product.title : "Unknown"}
                      </span>
                    </div>
                    <span>Quantity: {item.quantity}</span>
                    <span>Harga: Rp{product ? product.price : "N/A"}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <h2 className="mt-5 text-xl font-bold">
            Total Harga: Rp{totalPrice.toFixed(2)}
          </h2>
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
          >
            Buat Order
          </button>
          <div className="border-2 my-2 px-2 py-2">
            <h1 className="font-bold">
              INFO:
            </h1>
            <span>
              Semua pengiriman daerah jabodetabek gratis ongkir, Apabila
              pengiriman keluar jabodetabek harap hubungi kami di whatsapp
              +6285282338904 untuk info lebih lanjut
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
