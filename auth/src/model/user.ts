import mongoose from "mongoose";
import { Password } from "../services/Password";

interface UserInterface {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any> {
  build(user: UserInterface): UserDoc;
  toJSON(): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashPwd = await Password.hashPwd(this.password);
    this.password = await hashPwd;
  }

  done();
});

userSchema.statics.build = (user: UserInterface) => {
  return new User(user);
};

userSchema.methods.toJSON = function () {
  const userObj = this.toObject();
  userObj.id = userObj._id;
  delete userObj.password;
  delete userObj.__v;
  delete userObj._id;
  return userObj;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
