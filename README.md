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
