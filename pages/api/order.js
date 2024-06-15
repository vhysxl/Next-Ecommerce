import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/orders";
import { Product } from "@/models/product";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === "POST") {
        const { consumentId, items, shippingAddress, totalPrice } = req.body;

        if (!consumentId || !items || !shippingAddress || !totalPrice) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const newOrder = new Order({
                consumentId,
                items,
                shippingAddress,
                totalPrice,
            });

            await newOrder.save();
            return res.status(201).json({ message: "Order placed successfully" });
        } catch (error) {
            console.error("Error creating order:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === 'GET') {
        const { consumentId } = req.query;

        if (!consumentId) {
            return res.status(400).json({ error: "Missing consumentId" });
        }

        try {
            const orders = await Order.find({ consumentId });
            if (!orders || orders.length === 0) {
                return res.status(404).json({ error: "This user doesn't have any orders" });
            }

            return res.status(200).json(orders);
        } catch (error) {
            console.error("An error occurred: ", error);
            return res.status(500).json({ error: "An error occurred" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
