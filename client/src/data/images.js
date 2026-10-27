// Image slots. Files live in client/public/images.
// Missing files fall back to a labelled placeholder, so the layout never breaks.
const img = (file) => `/images/${file}`;

export const images = {
  // Not provided yet: add hero.jpg and marci.jpg to client/public/images
  hero: img('hero.jpg'),
  marci: img('marci.jpg'),

  // "Get it sold" cards, in order
  sold: [
    { src: img('sold-1.webp'), alt: 'Two people shaking hands over a laptop at a closing meeting' },
    { src: img('sold-2.webp'), alt: 'Modern home with a pool and mountain views' },
    { src: img('sold-3.webp'), alt: 'Bright living room with a white pallet coffee table' }
  ],

  // Photo gallery, in order (tile 1 is the large one)
  gallery: [
    { src: img('gallery-1.webp'), alt: 'Aerial view of homes beside a golf course pond' },
    { src: img('gallery-2.webp'), alt: 'Aerial view of community tennis and pickleball courts' },
    { src: img('gallery-3.webp'), alt: 'Community clubhouse with a circular drive and mountains behind' },
    { src: img('gallery-4.webp'), alt: 'Backyard pool and spa behind a tile-roof home' },
    { src: img('gallery-5.webp'), alt: 'Single-story home on a quiet cul-de-sac with mountain views' },
    { src: img('gallery-6.webp'), alt: 'Sunroom with a red armchair and large windows to the desert garden' },
    { src: img('gallery-7.webp'), alt: 'Community pool and clubhouse beside a lake' }
  ],

  // Four preview tiles under the search form (reuse home photos from the gallery)
  listings: [
    { src: img('gallery-1.webp'), alt: 'Homes beside a golf course pond' },
    { src: img('gallery-4.webp'), alt: 'Home with a backyard pool' },
    { src: img('gallery-5.webp'), alt: 'Single-story home on a cul-de-sac' },
    { src: img('gallery-6.webp'), alt: 'Sunroom interior' }
  ],

  // "Our services", in order
  services: [
    { src: img('service-1.webp'), alt: 'House-shaped keychain with keys on a wooden table' },
    { src: img('service-2.webp'), alt: 'Spanish-style home with a covered patio and pool at dusk' },
    { src: img('service-3.webp'), alt: 'Open kitchen with a marble island and pendant lights' }
  ]
};
