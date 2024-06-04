import { Product } from "@/models/product";

async function Handler(){
const method = req.method
    if(method==='GET'){
        if (req.query?.id){
            res.json(await Product.findOne(_id.req.query?.id))
        } else {
            res.json(await Product.find())
        }
    }
}