import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected successfully');
    } catch (error) {
        console.log('Connection Failed');
        process.exit(1);
    }
};

export default connectDB;
