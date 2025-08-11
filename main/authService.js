// main/authService.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'pos_auth';
const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class AuthService {
  constructor() {
    this.connected = false;
  }

  async connect() {
    if (this.connected) return;
    if (!MONGO_URI) throw new Error('MONGO_URI not set in .env');
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DBNAME,
  
    });
    this.connected = true;
    // Ensure unique index (Mongoose will create it)
    await User.init();
    console.log('AuthService: connected to MongoDB');
  }

  async signup({ name, email, password }) {
    await this.connect();
    email = (email || '').toLowerCase().trim();
    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error('Email already registered');
      err.code = 'USER_EXISTS';
      throw err;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id.toString(), name: user.name, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { user: { id: user._id.toString(), name: user.name, email: user.email }, token };
  }

  async login({ email, password }) {
    await this.connect();
    email = (email || '').toLowerCase().trim();
    const user = await User.findOne({ email });
    if (!user) {
      const e = new Error('Invalid credentials');
      e.code = 'INVALID_CREDENTIALS';
      throw e;
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const e = new Error('Invalid credentials');
      e.code = 'INVALID_CREDENTIALS';
      throw e;
    }
    const token = jwt.sign({ id: user._id.toString(), name: user.name, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { user: { id: user._id.toString(), name: user.name, email: user.email }, token };
  }

  verifyToken(token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      return payload;
    } catch (err) {
      const e = new Error('Invalid token');
      e.code = 'INVALID_TOKEN';
      throw e;
    }
  }
}

export default new AuthService();
// This service handles user authentication, including signup and login.
// It connects to MongoDB, hashes passwords, and generates JWT tokens for authenticated users.