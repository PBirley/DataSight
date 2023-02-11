import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.MONGO_DB_ATLAS_URL
console.log(mongoURL);

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoURL);
    console.log('Successfully connected to the database 🎉');
  } catch (err) {
    console.log('Mongoose connection err: ' + err);
  }
}
connectDB()

export default mongoose;