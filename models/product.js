import mongoose, {model, models, Schema} from "mongoose";


const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    stock: { type: Number, required: true }
});

export const Product = models.Product || model('Product', ProductSchema);