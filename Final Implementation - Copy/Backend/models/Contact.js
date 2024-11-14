import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  response: { type: String, default: '' },
}, { timestamps: true });

// Use 'mongoose.models.Contact' to prevent overwriting the model if it's already compiled
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
