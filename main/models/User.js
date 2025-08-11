// main/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true }, // hashed
}, { timestamps: true });

export default mongoose.models?.User || mongoose.model('User', userSchema);
// This schema defines a User model with fields for name, email, and password.
// The email field is unique and the password should be stored hashed.