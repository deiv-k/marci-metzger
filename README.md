# Marci Metzger Homes: Home page redesign (MERN)

Single-page Home redesign. React (Vite) front end, Express + Node API, MongoDB (Mongoose).

## Run it

```bash
npm run install:all
npm run images          # downloads the real photos from marcimetzger.com (run on your own machine)
cp server/.env.example server/.env   # optional: add a MongoDB URI
npm run dev             # client on http://localhost:5173, API on :5000
```

Production: `npm run build && npm start` serves the built client and the API on one port.

Without `MONGODB_URI` the API runs with in-memory storage, so everything works for a demo.

## Images
`npm run images` saves the hero and headshot as `hero.jpg` / `marci.jpg`, and every other photo on the live page as `site-01`, `site-02`, ...
in `client/public/images`. Then edit `client/src/data/images.js` so the listing, gallery and service slots use the files you want.
Missing files show a labelled placeholder instead of breaking the layout.

## API
- `GET /api/listings?location=&type=&beds=&baths=&minPrice=&maxPrice=&sort=` sample listings (replace with a real feed)
- `POST /api/contact` `{ name, email }` stores the message
- `GET /api/health`

## Responsive
Mobile-first CSS in `client/src/styles.css`: base (phones), 700px (tablet), 1024px (desktop).

## Deploy to Vercel

The `api/` folder holds the same API as serverless functions, and `vercel.json` tells Vercel how to build the site.

1. Push this folder to a GitHub repository (the `.gitignore` already skips `node_modules`, `dist` and `.env`).
2. Go to vercel.com, click **Add New > Project**, and import the repository.
3. Leave the settings as they are. `vercel.json` sets the build command and output folder.
4. Under **Environment Variables**, add `MONGODB_URI` (a free MongoDB Atlas connection string). Optional: without it the site still works, but contact messages are only written to the Vercel function logs.
5. Click **Deploy**. Vercel gives you a live `.vercel.app` link.

Make sure `client/public/images` holds `hero.jpg`, `marci.jpg` and the 13 photos before you push, or those spots show placeholders.

Or with the command line: `npm i -g vercel`, then `vercel` in this folder, and `vercel --prod` to publish.

MongoDB Atlas: create a free cluster, add a database user, and under Network Access allow `0.0.0.0/0` (Vercel's addresses change).
