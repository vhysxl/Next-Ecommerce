import { mongooseConnect } from "@/lib/mongoose";
import Cart from "@/models/cart";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === "POST") {
        const { consumentId, productId, action, quantity } = req.body;

        if (!consumentId || !productId) {
            return res.status(400).json({ error: "Missing consumentId or productId" });
        }

        try {
            let cart = await Cart.findOne({ consument: new mongoose.Types.ObjectId(consumentId) });

            if (!cart) {
                cart = new Cart({ consument: new mongoose.Types.ObjectId(consumentId), items: [] });
            }

            const existingItemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (action === "add") {
                if (existingItemIndex > -1) {
                    cart.items[existingItemIndex].quantity += 1;
                } else {
                    cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity: 1 });
                }
            } else if (action === "remove") {
                if (existingItemIndex > -1) {
                    cart.items.splice(existingItemIndex, 1);
                }
            } else if (action === "update") {
                if (existingItemIndex > -1) {
                    cart.items[existingItemIndex].quantity = quantity;
                } else {
                    cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity: quantity });
                }
            }

            await cart.save();
            return res.status(200).json(cart);
        } catch (error) {
            console.error("Error updating cart:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "GET") {
        const { consumentId } = req.query;

        if (!consumentId) {
            return res.status(400).json({ error: "Missing consumentId" });
        }

        try {
            const cart = await Cart.findOne({ consument: new mongoose.Types.ObjectId(consumentId) });
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            return res.status(200).json(cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}