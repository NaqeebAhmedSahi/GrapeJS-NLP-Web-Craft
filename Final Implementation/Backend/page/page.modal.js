import mongoose from 'mongoose';
const { Schema } = mongoose;

const PageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    slug: {
      type: String,
      required: true,
    },
    content: Object,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: 'Website', // Reference to the Website model
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'existing'], // Allow only 'new' or 'existing' values
      default: 'new', // Set default status to 'new' for newly created pages
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  },
);

export default mongoose.model('Pages', PageSchema);
