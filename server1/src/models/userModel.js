import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  Role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.methods.checkRole = (role) => {
    return this.role === role
}

export const userModel = mongoose.model('User', userSchema)