import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/product'),
          fetch('/api/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const categoriesMap = categoriesData.reduce((acc, category) => {
          acc[category._id] = category.name;
          return acc;
        }, {});

        setCategories(categoriesMap);

        const grouped = productsData.reduce((acc, product) => {
          const categoryName = categoriesMap[product.category] || 'Unknown Category';
          acc[categoryName] = acc[categoryName] || [];
          acc[categoryName].push(product);
          return acc;
        }, {});

        setProducts(productsData);
        setGroupedProducts(grouped);
      } catch (error) {
        console.error('Error fetching products and categories:', error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  return (
    <div>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category}>
          <div className="bg-black w-fit p-3 mt-4 mb-2 pt-2">
            <h2 className="text-3xl font-semibold m-4 text-white">{category}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-10">
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
                <div className="p-4">
                  <Link href={`/components/${product._id}`}>
                    <h2 className="text-red-600 text-xl font-semibold mb-2">{product.title}</h2>
                  </Link>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-gray-800 font-semibold mb-4">Price: Rp{product.price}</p>
                  <div className="mt-4">
                    {product.variants && product.variants.map((variant, index) => (
                      <div key={index} className="border-t border-gray-200 pt-4 mb-4">
                        <p className="text-gray-600 font-semibold mb-1">Variant: {variant.variant_name}</p>
                        <p className="text-gray-800 mb-1">Price: Rp{variant.price}</p>
                        <p className="text-gray-800">Stock: {variant.stock_quantity}</p>
                      </div>
                    ))}
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