import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Residential', 'Commercial'], default: 'Residential' },
    price: { type: Number, required: true },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    sqft: Number
  },
  { timestamps: true }
);

export default mongoose.model('Listing', listingSchema);
