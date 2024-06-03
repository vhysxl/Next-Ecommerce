import mongoose, { model, models, Schema } from "mongoose";

const ConsumentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
},
{timestamps: true}
);

const Consument = models.Consument || model('Consument', ConsumentSchema);

export default Consument;