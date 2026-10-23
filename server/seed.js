import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Story } from './models/Story.js';
import { Contact } from './models/Contact.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mapping_vadodara';

const sampleStories = [
  {
    name: 'Jignesh Patel',
    email: 'jignesh.patel@example.com',
    title: 'The Century-Old Chai Stall Near Nyay Mandir',
    location: 'Nyay Mandir, Old City',
    category: 'culture',
    description: 'Every morning since 1928, this small corner stall has brewed fresh kadak masala chai with crushed ginger and mint. Three generations of the same family have served lawyers, shopkeepers, and morning walkers here.',
    photoName: 'nyay-mandir-chai.jpg',
    status: 'community',
  },
  {
    name: 'Pooja Shah',
    email: 'pooja.shah@example.com',
    title: 'Restoring Heritage Woodwork in Lehripura Pol',
    location: 'Lehripura Pol',
    category: 'built',
    description: 'A community initiative by young architects and residents to document and preserve the carved wooden brackets and facades of traditional Maratha-Gaekwadi pol houses before they are replaced with concrete blocks.',
    photoName: 'lehripura-woodwork.jpg',
    status: 'community',
  },
];

const sampleContacts = [
  {
    name: 'Ananya Desai',
    email: 'ananya.d@example.com',
    topic: 'Volunteer contributor',
    message: 'Hello team, I am a photography student at MSU Faculty of Fine Arts. I would love to contribute photo-stories about old artisan workshops in Fatehpura.',
  },
];

async function seed() {
  console.log(`Connecting to ${MONGODB_URI}...`);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Seeding initial test data...');

    await Story.insertMany(sampleStories);
    console.log(`✓ Inserted ${sampleStories.length} sample stories into "stories" collection.`);

    await Contact.insertMany(sampleContacts);
    console.log(`✓ Inserted ${sampleContacts.length} sample message into "contacts" collection.`);

    console.log('\nSeeding complete! Run "npm run db:check" to view your database records.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
