import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 120, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    message: { type: String, trim: true, maxlength: 2000, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
