import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await res.json();
        setProduct(productData);
        console.log(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <>
      <div className="pb-12 overflow-x-hidden bg-gray-300 ">
        <Navbar />
        <div className="container mx-auto py-8">
          {product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="w-4/6 mx-auto rounded-sm">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    layout="responsive"
                    width={500}
                    height={500}
                    className="w-full"
                  />
                )}
              </div>
              <div className="mx-auto md:-mx-8">
                <h1 className="text-3xl font-semibold mb-4 text-black">
                  {product.title}
                </h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-800 text-xl font-semibold mb-4">
                  Price: Rp {product.price}
                </p>
                <button
                  onClick={() => cartHandle(product)}
                  className="pl-2 pt-2 rounded-md font-bold text-white flex flex-row gap-2 bg-black"
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
