// Shared taxonomy: categories (with colour palettes used by illustrations/pins) and content-status labels.

export const CATEGORIES = [
  { id: 'history', label: 'History & Heritage', blurb: 'Palaces, gates, cenotaphs and the layers of the old city.',
    palette: { bg: '#EAD3BC', fg: '#8A3B20', accent: '#C9663F' } },
  { id: 'art', label: 'Art & Culture', blurb: 'Museums, art schools, festivals and creative life.',
    palette: { bg: '#EBD9C0', fg: '#6B3A2E', accent: '#D08A3C' } },
  { id: 'food', label: 'Food & Local Markets', blurb: 'Markets, snacks, stalls and the people behind them.',
    palette: { bg: '#F1DFC2', fg: '#9A4A1C', accent: '#D9822B' } },
  { id: 'people', label: 'People & Communities', blurb: 'Voices that rarely make the headlines.',
    palette: { bg: '#DCE3D2', fg: '#1F4D3A', accent: '#B8502F' } },
  { id: 'public', label: 'Public Spaces', blurb: 'Gardens, lakes and shared ground.',
    palette: { bg: '#D5E0D0', fg: '#1F4D3A', accent: '#7BA05B' } },
  { id: 'hidden', label: 'Hidden Gems', blurb: 'Lesser-known corners worth a second look.',
    palette: { bg: '#E8D6C3', fg: '#3A302A', accent: '#B8502F' } },
  { id: 'urban', label: 'Urban Change & Environment', blurb: 'Rivers, growth, development and civic questions.',
    palette: { bg: '#DAD7CE', fg: '#2B2A27', accent: '#6E7F6A' } },
];

export const categoryById = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

// The three-way labelling system used everywhere on the site (see About → Editorial policy).
export const CONTENT_TYPES = {
  reference: {
    label: 'Reference',
    short: 'Based on public records',
    desc: 'Describes a real place or event using public sources. Facts still need to be cross-checked before being cited. Sources are listed on the story page.',
  },
  opinion: {
    label: 'Opinion',
    short: 'A personal viewpoint',
    desc: 'A personal or editorial viewpoint. It is clearly signed and is not presented as fact.',
  },
  demo: {
    label: 'Demonstration',
    short: 'Illustrative sample',
    desc: 'Illustrative content written to show what the platform would publish. Characters, quotes and scenes may be composites or fictional. It is not reporting.',
  },
};
