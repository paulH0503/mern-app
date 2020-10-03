import mongoose from 'mongoose';
import { errorAPI } from '../utils';
import env from './env';

// config
const URI = env.MONGO_URI;
console.log("Mongo URI",URI, process.env.MONGO_PASSWORD , process.env.MONGO_USER);
const connectMongoDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log("Mongo DB connected...");
  } catch(e) {
    console.error(e.message, "<=========");
    // exit 
    process.exit(errorAPI.ERR_MONGODB_CONNECT_FAIL);
  }
}

export default {
  connectMongoDB
}