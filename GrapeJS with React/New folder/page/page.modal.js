import mongoose from 'mongoose'; // Use ES6 import

const { Schema } = mongoose;

const Page = new Schema(
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Pages', Page); // Use ES6 export default
