import mongoose from 'mongoose';
import { seedAdmin } from 'utils/seedDb';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {});
    seedAdmin();
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
