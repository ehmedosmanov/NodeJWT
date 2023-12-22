import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  basket: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const User = mongoose.model('User', userSchema)
export const Product = mongoose.model('Product', productSchema);