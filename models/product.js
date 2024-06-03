import mongoose, {model, models, Schema} from "mongoose";

const VariantSchema = new Schema({
    variant_name: {type: String, required: true},
    price: {type: Number, required: true},
    stock_quantity: {type: Number, required: true}
})

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
    category: {type:mongoose.Types.ObjectId,ref:'Category'},
    variants: [VariantSchema]
});

export const Product = models.Product || model('Product', ProductSchema);