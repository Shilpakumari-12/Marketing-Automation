import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  googleId?: string;
  facebookId?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  googleId: { type: String },
  facebookId: { type: String }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password as string, salt);
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;