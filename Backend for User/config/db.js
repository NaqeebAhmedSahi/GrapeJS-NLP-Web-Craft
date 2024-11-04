import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/Users';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
