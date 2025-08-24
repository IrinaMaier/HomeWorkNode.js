import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const URL=process.env.MONGO_URL;

const connectDB=async()=>{
    try {
        await mongoose.connect(URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connected to MongoDB failed: ',error);
        
    }
};
export default connectDB;