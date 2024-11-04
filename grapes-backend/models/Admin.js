import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSuper: { type: Boolean, default: false },
  response: { type: Boolean, default: false }
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
