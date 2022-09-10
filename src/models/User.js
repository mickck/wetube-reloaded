import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  //this is new user being created
  console.log("Hash password:", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
