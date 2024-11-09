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
      ref: 'User', // Assuming you have a User model
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Pages', PageSchema);
