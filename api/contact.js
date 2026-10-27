import { connect, hasDb } from './_lib/db.js';
import Message from '../server/models/Message.js';
import { emailRe } from '../server/lib/search.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const name = String(body?.name ?? '').trim().slice(0, 120);
  const email = String(body?.email ?? '').trim().slice(0, 200);
  const message = String(body?.message ?? '').trim().slice(0, 2000);

  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    if (hasDb()) {
      await connect();
      await Message.create({ name, email, message });
    } else {
      // No database configured: the message only appears in the Vercel function logs.
      console.log('Contact message (MONGODB_URI not set):', { name, email, message });
    }
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Please call us instead.' });
  }
}
