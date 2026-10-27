import mongoose from 'mongoose';
import Listing from '../../server/models/Listing.js';
import { sampleListings } from '../../server/data/sampleListings.js';

// Reuse one connection across warm invocations of a serverless function.
const cache = globalThis.__mongo || (globalThis.__mongo = { promise: null });

export const hasDb = () => Boolean(process.env.MONGODB_URI);

export async function connect() {
  if (!hasDb()) return null;
  if (!cache.promise) {
    cache.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false
    });
  }
  try {
    return await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
}

export async function loadListings() {
  if (!(await connect())) return sampleListings;
  if ((await Listing.countDocuments()) === 0) {
    await Listing.insertMany(sampleListings.map(({ id, createdAt, ...rest }) => ({ ...rest, createdAt })));
  }
  return (await Listing.find().lean()).map((l) => ({ ...l, id: String(l._id) }));
}
