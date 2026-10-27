import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Message from './models/Message.js';
import Listing from './models/Listing.js';
import { sampleListings } from './data/sampleListings.js';
import { filterListings, emailRe } from './lib/search.js';

// Local development server. On Vercel the same logic runs as serverless functions in /api.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '20kb' }));

// ---- Storage: MongoDB when configured, otherwise in-memory so the demo always runs
let useMongo = false;
const memoryMessages = [];

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('MONGODB_URI not set: using in-memory storage.');
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    useMongo = true;
    console.log('MongoDB connected.');
    if ((await Listing.countDocuments()) === 0) {
      await Listing.insertMany(sampleListings.map(({ id, createdAt, ...rest }) => ({ ...rest, createdAt })));
      console.log('Seeded sample listings.');
    }
  } catch (err) {
    console.warn('MongoDB unavailable, falling back to in-memory storage:', err.message);
  }
}

// ---- Routes
app.get('/api/health', (_req, res) => res.json({ ok: true, storage: useMongo ? 'mongodb' : 'memory' }));

app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, 120);
  const email = String(req.body?.email ?? '').trim().slice(0, 200);
  const message = String(req.body?.message ?? '').trim().slice(0, 2000);
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  try {
    if (useMongo) await Message.create({ name, email, message });
    else memoryMessages.push({ name, email, message, createdAt: new Date() });
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please call us instead.' });
  }
});

app.get('/api/listings', async (req, res) => {
  try {
    let items = sampleListings;
    if (useMongo) {
      items = (await Listing.find().lean()).map((l) => ({ ...l, id: String(l._id) }));
    }
    const result = filterListings(items, req.query);
    res.json({ count: result.length, listings: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load listings.' });
  }
});

// ---- Serve the built React app when running `npm start` (self-hosting)
const dist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

connectDb().finally(() => {
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
});
