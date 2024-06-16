import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Catalog() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [categories, setCategories] = useState({});
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/product"),
          fetch("/api/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const categoriesMap = categoriesData.reduce((acc, category) => {
          acc[category._id] = category.name;
          return acc;
        }, {});

        setCategories(categoriesMap);

        const grouped = productsData.reduce((acc, product) => {
          const categoryName =
            categoriesMap[product.category] || "Unknown Category";
          acc[categoryName] = acc[categoryName] || [];
          acc[categoryName].push(product);
          return acc;
        }, {});

        setProducts(productsData);
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products and categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const cartHandle = async (product) => {
    console.log(product._id);
    console.log(session.user._id);
    if (!session || !session.user) {
      console.error("User not authenticated");
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
          productId: product._id,
          action: "add", // Add this line
        }),
      });

      if (!response.ok) {
        let errorResponse;
        try {
          errorResponse = await response.json();
        } catch (err) {
          console.error("Non-JSON response received:", response);
          throw new Error("Failed to add to cart: Non-JSON response received");
        }
        console.error("Error response:", errorResponse);
        throw new Error(
          `Failed to add to cart: ${errorResponse.message || "Unknown error"}`
        );
      }

      const cartData = await response.json();
      setCart(cartData);
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        console.error("Network error:", error);
      } else {
        console.error("Error adding to cart:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-black text-2xl text-center">
        <div>
          <h1>Memuat Produk</h1>
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

  return (
    <div>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category}>
          <div className="bg-black w-fit p-3 mt-4 mb-2 pt-2">
            <h2 className="text-3xl font-semibold m-4 text-white">
              {category}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-10">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={500}
                    height={1000}
                    className="w-full h-auto object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4 flex flex-col">
                  <Link href={`/components/${product._id}`}>
                    <h2 className="text-red-600 text-xl font-semibold mb-2">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-gray-800 font-semibold mb-4">
                    Price: Rp{product.price}
                  </p>
                  <div className="flex relative">
                    <button
                      onClick={() => cartHandle(product)}
                      className="pl-2 pt-2 rounded-md font-bold text-white flex flex-row gap-2 bg-black w-fit"
                    >
                      Tambah
                      <svg
                        width="36"
                        height="36"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="white"
                      >
                        <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
