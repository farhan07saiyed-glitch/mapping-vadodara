// Sample stories. Every story carries:
//   status   -> 'reference' | 'opinion' | 'demo'   (see categories.js → CONTENT_TYPES)
//   sources  -> starting references to consult (NOT a substitute for primary reporting)
//   toVerify -> what a reporter must still confirm before publishing for real
// To use your own photographs, put files in /public/images and set  image: 'images/your-file.jpg'

const TEAM = 'Mapping Vadodara team';

export const STORIES = [
  {
    id: 's-laxmi-vilas', title: 'The Palace Everyone Photographs, and the Questions Few Ask',
    category: 'history', area: 'Palace precinct', locationId: 'laxmi-vilas', status: 'reference',
    author: TEAM, date: '2026-10-02', readTime: 4, motif: 'palace', image: 'images/laxmi-vilas.jpg',
    summary: 'Laxmi Vilas is Vadodara\u2019s postcard image. But who is it for today, and whose labour built it?',
    body: [
      'Laxmi Vilas Palace is usually described as an Indo-Saracenic building from the Gaekwad era of Baroda, commissioned by Maharaja Sayajirao Gaekwad III and completed around 1890. Major Charles Mant is commonly credited as its architect. Parts of the grounds are open to visitors, and a museum within the precinct displays the Gaekwad collection.',
      'Most coverage stops at scale and style. A hyperlocal approach asks different questions. Who maintains the grounds every morning? How do the nearby lanes and vendors experience the stream of visitors? What do people who grew up nearby remember from before the palace became a tourist circuit?',
      'This entry is a starting reference. It is meant to be expanded through interviews with gardeners, guides, nearby residents and museum staff, voices that guidebooks tend to leave out.',
    ],
    sources: ['Gujarat Tourism, Vadodara destination pages', 'Encyclopaedic overview: \u201cLaxmi Vilas Palace\u201d (cross-check with a primary source)'],
    toVerify: ['Exact completion year and the roles of each architect', 'Which parts are open to the public, and current visiting hours', 'Ownership and management arrangements today'],
  },
  {
    id: 's-sayaji-baug', title: 'A Garden as Everyone\u2019s Living Room',
    category: 'public', area: 'Central Vadodara', locationId: 'sayaji-baug', status: 'opinion',
    author: `${TEAM} (editorial view)`, date: '2026-09-28', readTime: 3, motif: 'garden', image: 'images/sayaji-baug.jpg',
    summary: 'Public gardens do quiet social work. Sayaji Baug may be the city\u2019s most democratic room.',
    body: [
      'Sayaji Baug, also known as Kamati Baug, is Vadodara\u2019s large central garden. Within it sit a museum and gallery, open lawns and shaded paths. For many residents it is simply the place you go to walk, sit or meet.',
      'Our editorial view is that spaces like this are infrastructure for a city\u2019s social life, as important as roads. A garden where a retired teacher, a college student and a family with a stroller can share the same bench is rarer than it sounds.',
      'This is an opinion piece. It would be strengthened by short field notes from different times of day and by the voices of regular visitors, garden staff and vendors at the gates.',
    ],
    sources: ['Observation and editorial viewpoint (no external data used)'],
    toVerify: ['Opening hours, entry fees and rules', 'Historical background of the garden from archival sources'],
  },
  {
    id: 's-mandvi-gate', title: 'A Gate That Still Organises a Neighbourhood',
    category: 'history', area: 'Old city', locationId: 'mandvi-gate', status: 'reference',
    author: TEAM, date: '2026-09-20', readTime: 3, motif: 'gate', image: 'images/mandvi-gate.jpg',
    summary: 'Gates once marked a boundary. In the old city they still mark where a neighbourhood begins.',
    body: [
      'Mandvi Gate is one of the gateways of Vadodara\u2019s old city. Today it works less as a defence and more as a reference point. People give directions with it, shops cluster near it, and traffic bends around it.',
      'Hyperlocal journalism treats such landmarks as living infrastructure rather than monuments. How does the gate shape footfall for nearby traders? What happens to heritage structures when vehicles, signage and encroachment compete for the same space?',
      'This reference entry is the starting point for a walking-interview project: ask ten people to give directions to the gate and record how they describe it.',
    ],
    sources: ['Local heritage walk accounts (to be collected)', 'Municipal heritage listings (to be requested)'],
    toVerify: ['Construction period and original purpose', 'Present protection status of the structure'],
  },
  {
    id: 's-kirti-mandir', title: 'The \u201cTemple of Fame\u201d Few People Queue For',
    category: 'history', area: 'Sayajigunj, near the Vishwamitri', locationId: 'kirti-mandir', status: 'reference',
    author: TEAM, date: '2026-09-15', readTime: 3, motif: 'temple', image: 'images/kirti-mandir.jpg',
    summary: 'A 1936 cenotaph with a 35-metre shikhara and murals by Nandalal Bose, and surprisingly few visitors.',
    body: [
      'Kirti Mandir is a cenotaph of the Gaekwads, built in 1936 and often described as the \u201cTemple of Fame\u201d. According to public sources, the stone building is E-shaped, with terraces, balconies, domes and a central shikhara about 35 metres high.',
      'Its interiors are noted for murals attributed to the artist Nandalal Bose, including scenes such as the Gangavataran and the Life of Meera. Tourism pages call it one of the city\u2019s most stunning yet understated buildings, which is exactly the kind of place alternative media can bring back into conversation.',
      'What is missing from public sources is the present-day story: who looks after the murals, how visitors experience the place, and how it relates to the river nearby.',
    ],
    sources: ['Gujarat Tourism: Kirti Mandir (destination page)', 'Wikipedia: \u201cKirti Mandir, Vadodara\u201d (secondary; cross-check)'],
    toVerify: ['Current visiting hours (tourism pages list morning and afternoon slots)', 'Who commissioned each mural and the current conservation status', 'Precise map coordinates'],
  },
  {
    id: 's-sursagar', title: 'The Lake in the Middle of the Old City',
    category: 'public', area: 'Old city', locationId: 'sursagar', status: 'demo',
    author: `${TEAM} (demonstration)`, date: '2026-09-10', readTime: 3, motif: 'lake', image: 'images/sursagar-lake.jpg',
    summary: 'A lake at the centre of a crowded neighbourhood raises one simple question: who looks after it?',
    body: [
      'Sursagar is a lake in the old city, known for the large statue that rises from its centre. This demonstration piece shows how we would approach a civic-space story.',
      'Instead of describing the view, the reporter would ask practical questions. How often is the lake cleaned? Who decides? What do evening walkers, nearby traders and festival organisers each want from it? Which of those wishes conflict?',
      'In a real version of this story the answers would come from municipal records, site visits across seasons and several named interviewees. In this prototype it is a template, not a finding.',
    ],
    sources: ['Template only. No findings are claimed.'],
    toVerify: ['Every factual claim, because this is a demonstration story'],
  },
  {
    id: 's-raopura-market', title: 'Morning in the Historic Market Lanes of Raopura',
    category: 'food', area: 'Raopura / old city', locationId: 'raopura-market', status: 'reference',
    author: `${TEAM} Heritage Desk`, date: '2026-09-05', readTime: 4, motif: 'market', image: 'images/raopura-market.jpg',
    summary: 'How centuries-old vegetable, flower, and spice lanes between Mandvi and Jubilee Baug come alive before dawn.',
    body: [
      'Before the first morning light touches the clock towers of Raopura, wholesale tempos and handcarts unload crates of fresh coriander, green chillies, and vibrant marigold garlands onto the historic market sidewalks.',
      'Longtime vendors who have occupied the same threshold spots for forty years arrange their seasonal produce in neat pyramids. Morning walkers stopping by for fresh fruit and herbs exchange neighbourhood news with tea stall owners boiling fresh ginger chai.',
      'Despite the expansion of modern supermarkets on the city outskirts, the historic market core between Mandvi and Raopura remains irreplaceable: credit is informal, trust is multigenerational, and every transaction is accompanied by a warm conversation.',
    ],
    sources: ['On-site market documentation', 'Vadodara Heritage Trust archives', 'Interviews with local shopkeepers association'],
    toVerify: ['Upcoming pedestrianisation proposals for Mandvi-Raopura corridor'],
  },

  {
    id: 's-garba', title: 'Nine Nights: Who Gets to Play Garba?',
    category: 'art', area: 'City-wide', locationId: null, status: 'opinion',
    author: `${TEAM} (editorial view)`, date: '2026-10-08', readTime: 4, motif: 'festival', image: 'images/navratri-garba.jpg',
    summary: 'Vadodara\u2019s Navratri is known far beyond the city. An editorial question: who is included, and who pays?',
    body: [
      'Navratri in Gujarat is known for garba, and Vadodara is often mentioned among the cities where it is celebrated on a large scale. That visibility raises questions mainstream coverage rarely asks.',
      'Alongside the large organised venues there are neighbourhood garbas in societies and lanes. Who has access to which space? What do tickets and passes mean for communities who played in the street for generations? How do local musicians, costume sellers and organisers experience the season?',
      'This is an editorial viewpoint. A reported version would collect first-person accounts from players, organisers, residents near large venues and the people who work the nine nights.',
    ],
    sources: ['Editorial viewpoint; no data claims made'],
    toVerify: ['Any attendance, pricing or organiser details before publication'],
  },
  {
    id: 's-vishwamitri', title: 'The River the City Grew Around',
    category: 'urban', area: 'City-wide', locationId: null, status: 'reference',
    author: TEAM, date: '2026-09-25', readTime: 5, motif: 'river', image: 'images/vishwamitri-river.jpg',
    summary: 'The Vishwamitri runs through Vadodara. Urban growth, flooding and wildlife all meet at its banks.',
    body: [
      'The Vishwamitri river flows through Vadodara, and historical accounts link the city\u2019s older names to the banyan trees along its banks. Today it is also discussed in connection with flooding, encroachment, pollution and the wildlife, including crocodiles, that lives in and near it.',
      'These are exactly the issues where citizen-sourced evidence matters: photographs of the river at different seasons, accounts from residents living near the banks, and questions about how development approvals interact with flood-prone land.',
      'This entry is not pinned to a single point because the story belongs to the whole river. It is a reference sketch that points to the reporting still to be done.',
    ],
    sources: ['Wikipedia: \u201cKirti Mandir, Vadodara\u201d mentions the river and the city\u2019s older names (secondary)', 'Municipal and state flood records (to be requested)'],
    toVerify: ['Flood history, dates and impacts', 'Official statements on encroachment and clean-up projects', 'Current wildlife management arrangements'],
  },
  {
    id: 's-fine-arts', title: 'What an Art School Does to a City\u2019s Walls',
    category: 'art', area: 'Fatehgunj / university area', locationId: 'msu-fine-arts', status: 'opinion',
    author: `${TEAM} (editorial view)`, date: '2026-10-04', readTime: 3, motif: 'art', image: 'images/msu-fine-arts.jpg',
    summary: 'Maharaja Sayajirao University\u2019s Faculty of Fine Arts is widely known. How does a city live with its artists?',
    body: [
      'The Faculty of Fine Arts at Maharaja Sayajirao University is widely recognised in Indian art education. Our editorial interest is not in its reputation but in its neighbourhood effect: the studios, the exhibitions, the students who paint and print in public view.',
      'Does the city treat its art students as a resource, or as a crowd that fills cafes and then leaves? Where do young artists find affordable studio space? Which spaces welcome experiments?',
      'This is an opinion piece that frames questions. A reported version would feature students, alumni and independent artists, with their permission.',
    ],
    sources: ['Editorial viewpoint; institutional background to be confirmed from the university\u2019s own publications'],
    toVerify: ['Institutional history and notable alumni', 'Details of any public exhibitions or open studios'],
  },
  {
    id: 's-tambekar-wada', title: 'A Painted Mansion in the Old City',
    category: 'hidden', area: 'Old city', locationId: 'tambekar-wada', status: 'reference',
    author: TEAM, date: '2026-10-06', readTime: 3, motif: 'wada', image: 'images/tambekar-wada.jpg',
    summary: 'Tambekar Wada is often mentioned among the old city\u2019s lesser-known heritage houses.',
    body: [
      'A wada is a traditional courtyard mansion. Tambekar Wada in Vadodara\u2019s old city is commonly mentioned for its painted interiors and is the kind of place that rewards slow looking.',
      'Hidden-gem stories can easily become tourism copy. We try to ask more: who lives or works around it, what is its condition, and what would it take to keep such houses standing?',
      'This is a starting entry. Before anyone visits, check access and permissions locally, because many heritage houses are private or have limited opening.',
    ],
    sources: ['Local heritage walk accounts (to be collected)', 'Heritage listings (to be requested)'],
    toVerify: ['Exact location and entrance', 'Opening arrangements and any visitor rules', 'Date, builder and protection status'],
  },
  {
    id: 's-garba-united-way', title: 'United Way of Baroda: 50,000 Dancers and the World’s Largest Garba',
    category: 'art', area: 'Atladra / Vadodara', locationId: null, status: 'reference',
    author: TEAM, date: '2026-10-10', readTime: 5, motif: 'festival', image: 'images/garba-united-way.jpg',
    summary: 'The Guinness-recognized spectacle where over fifty thousand dancers move in hypnotic concentric rings under stadium lighting.',
    body: [
      'Vadodara is known globally as the Garba capital of the world. While Navratri is celebrated across Gujarat, in Vadodara it achieves a scale that is unmatched anywhere on the planet. The United Way of Baroda Garba Mahotsav is its most famous stage, drawing more than 50,000 dancers in traditional attire every single night for nine consecutive nights.',
      'Unlike commercial Bollywood disco-dandiya in other metros, Vadodara’s garba is defined by traditional acoustic rhythm, pristine circular footwork, and live folk singers like Atul Purohit whose devotional chants echo across miles. Dancers arrange themselves in dozens of concentric circles that spin around the central temple stage with astonishing precision.',
      'Behind the grandeur lies a unique community model: the event operates as a non-profit charity initiative, with pass revenues channeled directly into supporting local hospitals, educational foundations, and social welfare programs across Gujarat.',
    ],
    sources: ['United Way of Baroda Foundation archives', 'Limca Book of Records documentation on Vadodara Garba'],
    toVerify: ['Official yearly pass registrations and charity allocation records', 'Sound decibel compliance and traffic management protocols'],
  },
  {
    id: 's-garba-lvp', title: 'Lukshmi Vilas Palace Heritage Garba: Royalty, Craft, and Devotion Under the Stars',
    category: 'art', area: 'Palace Grounds', locationId: 'laxmi-vilas', status: 'reference',
    author: TEAM, date: '2026-10-11', readTime: 4, motif: 'palace', image: 'images/garba-lvp.jpg',
    summary: 'A regal Navratri evening against the illuminated Indo-Saracenic arches of the Gaekwad royal residence.',
    body: [
      'Against the majestic facade of the Lukshmi Vilas Palace, the Heritage Garba represents the aristocratic and traditional roots of Vadodara’s celebration. Spearheaded by the royal family, including Maharani Radhikaraje Gaekwad, it prioritizes pure folk singing, hand-embroidered heritage chaniya cholis, and intimate communal devotion over loud synthesized tracks.',
      'Organized in collaboration with the Maharaja Fateh Singh Museum Trust and the Maharani Chimnabai Stree Udyogalaya, the event serves four pillars: Cause, Cuisine, Craft, and Culture. Local Gujarati artisans and weavers are given platforms to display handwoven Bandhani, Patola, and mirrorwork ensembles.',
      'The visual splendour of dancers twirling upon open lawns while the palace minarets glow in the warm night air is one of the most unforgettable sights in western India.',
    ],
    sources: ['Maharaja Fateh Singh Museum Trust announcements', 'Heritage Garba festival reports'],
    toVerify: ['Artisan empowerment allocations and spectator capacities'],
  },
  {
    id: 's-sev-usal', title: 'The Bowl That Defines Vadodara: The Story of Sev Usal',
    category: 'food', area: 'Kirti Stambh & Old City', locationId: 'sursagar', status: 'reference',
    author: TEAM, date: '2026-10-07', readTime: 4, motif: 'food', image: 'images/food-sev-usal.jpg',
    summary: 'A spicy pea curry, fiery tari, crisp sev, and soft pav—how a humble street stall dish became the city’s culinary signature.',
    body: [
      'Ask any Barodian what dish represents the soul of the city, and the answer is unanimous: Sev Usal. Unlike the misal of Maharashtra or the ragda of Mumbai, Vadodara’s Sev Usal is distinct: dried white peas slow-simmered into a thick, aromatic gravy, then drenched in a ladle of fiery red chili-garlic oil known locally as "tari".',
      'The bowl is heaped with freshly fried spicy besan sev, chopped spring onions, coriander, and served alongside pillowy warm pav or buns. At legendary stalls like Mahakali Sev Usal near Kirti Stambh—serving patrons since the 1970s—customers custom-order their tari level from mild to eye-watering extra-spicy.',
      'More than street food, Sev Usal is the city’s democratic social equalizer. College students, auto drivers, judges from the sessions court, and families crowd side by side at narrow stainless steel benches, sharing the common language of a steaming bowl.',
    ],
    sources: ['Culinary archives of Vadodara Street Food', 'Oral history of old city vendors near Kirti Stambh'],
    toVerify: ['Origin timeline of the earliest commercial usal vendors in the 1960s'],
  },
  {
    id: 's-jagdish-farsan', title: 'The 1938 Legacy: How Jagdish Made Bhakharwadi and Lilo Chevdo World-Famous',
    category: 'food', area: 'Raopura & Sayajigunj', locationId: 'raopura-market', status: 'reference',
    author: TEAM, date: '2026-10-05', readTime: 4, motif: 'food', image: 'images/food-jagdish-farsan.jpg',
    summary: 'From a small storefront in old Baroda to a global name, the secret 21-spice formula that defined Gujarati namkeen.',
    body: [
      'In 1938, Shri Bhailalbhai Raja started a small snack shop named Jagdish Farshan in the bustling heart of Vadodara. Over the next eight decades, the shop did something extraordinary: it transformed everyday teatime snacks into an international gastronomic brand.',
      'Jagdish is celebrated across the global Indian diaspora for pioneering two signature creations. First is the handcrafted Bhakharwadi: crisp golden spiral rolls stuffed with dry coconut, poppy seeds, sesame, and a secret 21-spice mixture that creates an exquisite balance of sweet, spicy, and tangy flavors. Second is Lilo Chevdo—a unique, soft and moist spiced potato-and-lentil snack that melts on the tongue, unlike any dry chivda found elsewhere.',
      'Today, travellers stopping at Vadodara railway station or driving across Gujarat make a mandatory pilgrimage to Jagdish outlets to carry carton boxes of farshan across the globe.',
    ],
    sources: ['Jagdish Farshan historical records (1938–present)', 'Gujarat Chamber of Commerce local industry profiles'],
    toVerify: ['Year of introduction of the first commercial lilo chevdo recipe'],
  },
  {
    id: 's-duliram-penda', title: '160 Years in Raopura: How Duliram Penda Became Vadodara’s Sweet Trademark',
    category: 'food', area: 'Raopura', locationId: 'raopura-market', status: 'reference',
    author: TEAM, date: '2026-10-03', readTime: 4, motif: 'food', image: 'images/food-duliram-penda.jpg',
    summary: 'Slow-simmered mawa, cardamom, and royal patronage: the legendary sweetshop that has delighted Barodians since 1850.',
    body: [
      'Tucked in the lanes of Raopura, Duliram Pendawala has sweetened the celebrations of Vadodara for over 160 years. Established in the mid-19th century by Duliram Sharma, who brought traditional confectionery methods from the Mathura region, the sweetshop quickly earned royal patronage under the Gaekwads of Baroda.',
      'Their signature offering—the Mathura Penda (Duliram Peda)—is made with pure milk mawa slow-cooked over hours in large iron cauldrons until it attains a deep, caramelized richness, subtly spiced with cardamom and saffron. It has a distinctive soft, grainy texture that melts instantly on the palate.',
      'Whether welcoming a daughter-in-law, celebrating festival mornings of Diwali and Janmashtami, or packing gifts for relatives abroad, a box of Duliram Penda is considered the ultimate gesture of authentic Barodian hospitality.',
    ],
    sources: ['Heritage records of Raopura commerce', 'History of Vadodara heritage documentation'],
    toVerify: ['Exact shop lease records and early Gaekwad royal confectionery records'],
  },
  {
    id: 's-mangal-bazaar', title: 'Mangal Bazaar: Where Every Step Bargains With History',
    category: 'history', area: 'Old city (Mandvi)', locationId: 'mangal-bazaar', status: 'reference',
    author: TEAM, date: '2026-09-30', readTime: 4, motif: 'market', image: 'images/mangal-bazaar.jpg',
    summary: 'The bustling open-air shopping labyrinth of street vendors, textiles, jewellery, and footwear connecting to Mandvi Gate.',
    body: [
      'Mangal Bazaar is the undisputed commercial artery of old Vadodara. Stretching between Mandvi Gate and Champaner Gate, this dense, pedestrian-packed lane is alive with hundreds of independent vendors selling colorful bandhani sarees, embroidered kurtas, brass utensils, footwear, glass bangles, and festive decorations.',
      'The market is an irreplaceable economic ecosystem where street hawkers on footpaths share space with fourth-generation multi-storey textile houses. The aromas of roasting peanuts, masala corn, and fresh jalebi mingle with the calls of shopkeepers demonstrating fabrics.',
      'For anyone seeking to understand the living, breathing street commerce of Gujarat, Mangal Bazaar is an open-air masterclass in urban vitality.',
    ],
    sources: ['Old City Traders Association interviews', 'Vadodara Municipal Corporation market records'],
    toVerify: ['Historical demarcation of trade quarters established under Maharaja Sayajirao II'],
  },
  {
    id: 's-khanderao-market', title: 'Khanderao Market: Inside Maharaja Sayajirao’s Living Civic Monument',
    category: 'history', area: 'Rajmahal Road', locationId: 'khanderao-market', status: 'reference',
    author: TEAM, date: '2026-09-22', readTime: 4, motif: 'market', image: 'images/khanderao-market.jpg',
    summary: 'Built in 1906, an architectural marvel blending grand Indo-Saracenic towers with the city’s largest vegetable and flower bazaar.',
    body: [
      'In 1906, Maharaja Sayajirao Gaekwad III presented the city of Baroda with an extraordinary gift to celebrate the silver jubilee of his administration: Khanderao Market, named in memory of Maharaja Khanderao Gaekwad.',
      'Designed in a fusion of Indo-Saracenic and European medieval architecture, the stone structure features soaring shikharas, carved balconies, and clock faces. Uniquely, it was designed as a dual-purpose civic monument: housing the administrative headquarters of the municipal corporation on the upper floors while dedicating the vast ground courtyard to the public vegetable and fruit market.',
      'Every morning at 4:30 AM, the market erupts into life as trucks from surrounding agricultural districts unload thousands of crates of fresh produce, flowers, and seasonal fruit, maintaining an unbroken rhythm of urban trade for over a century.',
    ],
    sources: ['Gaekwad Silver Jubilee Commemoration Volume (1906)', 'Vadodara Municipal Corporation heritage documentation'],
    toVerify: ['Original architectural plans by Robert Chisholm and subsequent municipal renovations'],
  },
  {
    id: 's-street-food', title: 'Midnight on the Griddle: Vadodara’s Street Vendors and Ratri Bazar',
    category: 'food', area: 'Karelibaug & City-wide', locationId: null, status: 'reference',
    author: TEAM, date: '2026-09-18', readTime: 4, motif: 'food', image: 'images/street-vendors.jpg',
    summary: 'How an innovative municipal night food market gave street vendors dignity while keeping the city fed till 3 AM.',
    body: [
      'Vadodara is one of Gujarat’s safest and most nocturnal cities. To regularize roadside food stalls while safeguarding street livelihoods, the city created Ratri Bazar in Karelibaug—a sprawling open-air night food complex where dozens of food stalls operate until 3 AM under hygienic, well-lit canopies.',
      'Here, street vendors serve everything from steaming clay-pot Matka Biryani and artisanal cheesy dosas to sweet Cold Coco, spicy chaat, and freshly fried hot jalebis with fafda. Across the wider city, carts selling live snacks like dabeli, kachori, and roasted corn anchor neighborhood roundabouts.',
      'The vibrancy of these vendor stalls reflects the warmth of Vadodara’s public culture—where an evening out with friends invariably finishes around a roadside griddle.',
    ],
    sources: ['VMC Street Vendor Policy reports', 'Interviews with night food court vendors in Karelibaug'],
    toVerify: ['Vendor registration numbers and formal licensing under the Street Vendors Act'],
  },
  {
    id: 's-nyay-mandir', title: 'Nyay Mandir: The Temple of Justice Overlooking Sursagar Lake',
    category: 'history', area: 'Beside Sursagar Lake', locationId: 'nyay-mandir', status: 'reference',
    author: TEAM, date: '2026-09-12', readTime: 4, motif: 'palace', image: 'images/nyay-mandir.jpg',
    summary: 'Commissioned by Sayajirao III in memory of Maharani Chimnabai, this grand courthouse is an architectural tour de force.',
    body: [
      'Standing majestically on the eastern shore of Sursagar Lake, Nyay Mandir (Temple of Justice) was designed by the acclaimed architect Robert Chisholm and opened in 1896. Initially conceived as a vegetable market, Maharaja Sayajirao Gaekwad III transformed it into the city’s central judicial complex.',
      'The building is a breathtaking showcase of Indo-Saracenic design, with towering minarets, central Italian marble statue of Maharani Chimnabai I, carved stone jaalis, and a high-vaulted central hearing hall that accommodated legal proceedings for over a century.',
      'As judicial operations shift to newer facilities, heritage conservationists and citizens actively campaign to preserve Nyay Mandir as an active public museum and cultural heritage center for the city.',
    ],
    sources: ['Gujarat State Archives on Judicial Administration in Baroda State', 'Archaeological and architectural studies on Robert Chisholm'],
    toVerify: ['Adaptive reuse plans under consideration by Gujarat state government'],
  },
];

export const storyById = (id) => STORIES.find((s) => s.id === id);

