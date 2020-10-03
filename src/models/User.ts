import mongoose, { Schema, Document } from 'mongoose';
import { schemaDBKey } from '../utils';

interface IUser extends Document {
  name: string
  email: string
  password: string
  date: Date
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  // avatar: {
  //   type: String
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model<IUser>(schemaDBKey.USER, UserSchema);
export default User;