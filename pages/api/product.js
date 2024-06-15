import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function productHandler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        if (req.query.id) {
            try {
                const product = await Product.findById(req.query.id);
                if (product) {
                    res.json(product);
                } else {
                    res.status(404).json({ error: 'Product not found' });
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            try {
                const products = await Product.find();
                res.json(products);
            } catch (error) {
                console.error('Error fetching products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}