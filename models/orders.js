import mongoose, { models, model, Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
    consumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consument', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        notelp: {type: String, required: true},
        domisili: {type: String, required: true}
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {type: String, default: "Menunggu Pembayaran"}
});

const Order = models.Order || mongoose.model('Order', orderSchema);

export default Order;
