import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function productHandler(req, res){
    await mongooseConnect();

    if (req.method === 'GET'){
        if (req.query?.id) {
            res.json(await Category.findOne(_id.req.query?.id))
        } else {
            res.json(await Category.find())
        }
    }
}
