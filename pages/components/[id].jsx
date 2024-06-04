import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";

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
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-300">
      <Navbar/>
      <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images && product.images.length > 0 && (
            <img src={product.images[0]} alt={product.title} className="w-full" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-black">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-800 text-xl font-semibold mb-4">Price: ${product.price}</p>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            {product.variants && product.variants.map((variant, index) => (
              <div key={index} className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-gray-600 font-semibold mb-1">Variant: {variant.variant_name}</p>
                <p className="text-gray-800 mb-1">Price: ${variant.price}</p>
                <p className="text-gray-800">Stock: {variant.stock_quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}