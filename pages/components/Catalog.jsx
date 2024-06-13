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
      }
    };

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const cartHandle = async (product) => {
    console.log(product._id)
    console.log(session.user._id)
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
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ product, quantity: 1 });
      }

      setCart(updatedCart);
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        console.error("Network error:", error);
      } else {
        console.error("Error adding to cart:", error);
      }
    }
  };

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
                      Add to Cart
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
