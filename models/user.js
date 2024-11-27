import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' },
  });
  
  // Hash password before saving
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  export default mongoose.model("User",userSchema)