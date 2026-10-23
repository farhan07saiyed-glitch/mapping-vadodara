// Map locations. Coordinates are APPROXIMATE (hand-placed on OpenStreetMap, to within a few hundred metres).
// precision: 'landmark' = a specific building/garden;  'area' = a neighbourhood-level marker, not an address.
// Replace with exact coordinates after on-site verification. Places we could not place with confidence are NOT pinned.

export const LOCATIONS = [
  {
    id: 'laxmi-vilas', name: 'Laxmi Vilas Palace', category: 'history', area: 'Palace precinct',
    lat: 22.299, lng: 73.1915, precision: 'landmark', status: 'reference', storyId: 's-laxmi-vilas', motif: 'palace',
    image: 'images/laxmi-vilas.jpg',
    description: 'The grand Gaekwad-era palace, usually described as Indo-Saracenic in style. Part of the grounds houses a museum.',
  },
  {
    id: 'sayaji-baug', name: 'Sayaji Baug (Kamati Baug)', category: 'public', area: 'Central Vadodara',
    lat: 22.3125, lng: 73.1892, precision: 'landmark', status: 'reference', storyId: 's-sayaji-baug', motif: 'garden',
    image: 'images/sayaji-baug.jpg',
    description: 'The city\u2019s large central garden, a daily commons for walkers, families, students and groups.',
  },
  {
    id: 'baroda-museum', name: 'Baroda Museum & Picture Gallery', category: 'art', area: 'Inside Sayaji Baug',
    lat: 22.3112, lng: 73.1887, precision: 'landmark', status: 'reference', storyId: null, motif: 'museum',
    image: 'images/baroda-museum.jpg',
    description: 'A long-standing museum and gallery inside the garden grounds, housing European masters and royal collections.',
  },
  {
    id: 'mandvi-gate', name: 'Mandvi Gate', category: 'history', area: 'Old city',
    lat: 22.3003, lng: 73.21, precision: 'landmark', status: 'reference', storyId: 's-mandvi-gate', motif: 'gate',
    image: 'images/mandvi-gate.jpg',
    description: 'One of the old city’s gateways, still a landmark that anchors the surrounding lanes.',
  },
  {
    id: 'kirti-mandir', name: 'Kirti Mandir', category: 'history', area: 'Near the Vishwamitri river, Sayajigunj side',
    lat: 22.3068, lng: 73.1935, precision: 'landmark', status: 'reference', storyId: 's-kirti-mandir', motif: 'temple',
    image: 'images/kirti-mandir.jpg',
    description: 'The “Temple of Fame”, a 1936 cenotaph of the Gaekwads with a tall central shikhara.',
  },
  {
    id: 'sursagar', name: 'Sursagar Lake', category: 'public', area: 'Old city',
    lat: 22.301, lng: 73.207, precision: 'landmark', status: 'reference', storyId: 's-sursagar', motif: 'lake',
    image: 'images/sursagar-lake.jpg',
    description: 'A historic lake in the heart of the old city, recognisable by the majestic Sarveshwar Mahadev statue rising from its centre.',
  },
  {
    id: 'nyay-mandir', name: 'Nyay Mandir (Temple of Justice)', category: 'history', area: 'Beside Sursagar Lake',
    lat: 22.3015, lng: 73.2052, precision: 'landmark', status: 'reference', storyId: 's-nyay-mandir', motif: 'palace',
    image: 'images/nyay-mandir.jpg',
    description: 'The grand Indo-Saracenic judicial monument commissioned by Maharaja Sayajirao Gaekwad III, overlooking Sursagar Lake.',
  },
  {
    id: 'khanderao-market', name: 'Khanderao Market', category: 'history', area: 'Rajmahal Road',
    lat: 22.2965, lng: 73.2012, precision: 'landmark', status: 'reference', storyId: 's-khanderao-market', motif: 'market',
    image: 'images/khanderao-market.jpg',
    description: 'Built in 1906 by Sayajirao III, combining monumental carved stone pavilions with the city’s lively fresh vegetable and flower market and municipal offices.',
  },
  {
    id: 'mangal-bazaar', name: 'Mangal Bazaar & Old City Lanes', category: 'food', area: 'Between Mandvi & Champaner Gate',
    lat: 22.3008, lng: 73.2085, precision: 'area', status: 'reference', storyId: 's-mangal-bazaar', motif: 'market',
    image: 'images/mangal-bazaar.jpg',
    description: 'Vadodara’s bustling commercial artery packed with local street vendors, traditional clothes, jewellery, and snack carts.',
  },
  {
    id: 'raopura-market', name: 'Raopura Market & Clock Tower', category: 'food', area: 'Raopura',
    lat: 22.3035, lng: 73.211, precision: 'area', status: 'reference', storyId: 's-raopura-market', motif: 'market',
    image: 'images/raopura-market.jpg',
    description: 'Old city market street anchored by the 1896 Chimnabai Clock Tower, famed for heritage jewelers, textile shops, and historic sweetmakers.',
  },
  {
    id: 'msu-fine-arts', name: 'MSU Faculty of Fine Arts (campus area)', category: 'art', area: 'Fatehgunj / university area',
    lat: 22.3105, lng: 73.186, precision: 'area', status: 'opinion', storyId: 's-fine-arts', motif: 'art',
    image: 'images/msu-fine-arts.jpg',
    description: 'The legendary art school of Maharaja Sayajirao University, an intellectual and creative heartbeat of Vadodara.',
  },
  {
    id: 'tambekar-wada', name: 'Tambekar Wada', category: 'hidden', area: 'Raopura / old city',
    lat: 22.3041, lng: 73.2096, precision: 'landmark', status: 'reference', storyId: 's-tambekar-wada', motif: 'wada',
    image: 'images/tambekar-wada.jpg',
    description: 'A 19th-century Maratha townhouse famed for its exquisite multi-storey tempera wall murals and ornate woodwork.',
  },
];

export const locationById = (id) => LOCATIONS.find((l) => l.id === id);
