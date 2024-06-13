import mongoose, { model, models, Schema } from "mongoose";

const CartSchema = new Schema({
    consument: { type: Schema.Types.ObjectId, ref: 'Consument', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;