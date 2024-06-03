import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function productHandler(req, res){
    if (req.method === 'GET'){
        if (req.query?.id) {
            res.json(await Product.findOne(_id.req.query?.id))
        } else {
            res.json(await Product.find())
        }
    }
}
