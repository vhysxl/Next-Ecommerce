import { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      console.log(products)
    }



    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products && products.map((product) => (
        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          {product.images && product.images.length > 0 && (
            <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
            <h2 className="text-red-600 text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold mb-4">Price: ${product.price}</p>
            <div className="mt-4">
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
      ))}
    </div>
  );
}