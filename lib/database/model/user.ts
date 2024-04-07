import {Schema , model , models} from 'mongoose'


const UserSchema = new Schema({
    clerkId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    photo: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    planId: {
      type: Number,
      default: 1,
    },
    creditBalance: {
      type: Number,
      default: 10,
    },
  });
  
  const User = models?.User || model("User", UserSchema);
  
  export default User;