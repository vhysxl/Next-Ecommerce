import { Product } from "@/models/product";

export default async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      if (req.query?.id) {
        const product = await Product.findById(req.query.id);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      } else {
        const products = await Product.find();
        res.status(200).json(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}