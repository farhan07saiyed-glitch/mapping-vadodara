import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Story } from './models/Story.js';
import { Contact } from './models/Contact.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mapping_vadodara';

async function checkDatabase() {
  console.log('\n======================================================');
  console.log('       MAPPING VADODARA - DATABASE INSPECTOR');
  console.log('======================================================');
  console.log(`Connecting to: ${MONGODB_URI} ...\n`);

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
    });

    console.log('STATUS:   ONLINE (Connected to local MongoDB)');
    console.log(`DATABASE: ${conn.connection.name}`);
    console.log(`HOST:     ${conn.connection.host}:${conn.connection.port}`);

    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\nCOLLECTIONS FOUND:');
    if (collections.length === 0) {
      console.log('  (No collections yet. Submitting a story will create the "stories" collection automatically)');
    } else {
      collections.forEach((c) => console.log(`  - ${c.name}`));
    }

    // Inspect stories
    const storyCount = await Story.countDocuments();
    console.log(`\nSTORIES COLLECTION (${storyCount} records):`);
    if (storyCount === 0) {
      console.log('  No stories saved yet. Submit one from the "Share Your Story" form in the app.');
    } else {
      const recentStories = await Story.find().sort({ createdAt: -1 }).limit(5);
      recentStories.forEach((s, idx) => {
        console.log(`  [${idx + 1}] ID: ${s._id}`);
        console.log(`      Title:       "${s.title}"`);
        console.log(`      Author:      ${s.name} <${s.email}>`);
        console.log(`      Location:    ${s.location}`);
        console.log(`      Category:    ${s.category}`);
        console.log(`      Date:        ${s.createdAt.toLocaleString('en-IN')}`);
        console.log(`      Preview:     ${s.description.substring(0, 70)}...`);
        console.log('  ----------------------------------------------------');
      });
    }

    // Inspect contacts
    const contactCount = await Contact.countDocuments();
    console.log(`\nCONTACT MESSAGES COLLECTION (${contactCount} records):`);
    if (contactCount === 0) {
      console.log('  No contact messages saved yet.');
    } else {
      const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
      recentContacts.forEach((c, idx) => {
        console.log(`  [${idx + 1}] ID: ${c._id}`);
        console.log(`      From:        ${c.name} <${c.email}>`);
        console.log(`      Topic:       ${c.topic}`);
        console.log(`      Date:        ${c.createdAt.toLocaleString('en-IN')}`);
        console.log(`      Message:     ${c.message.substring(0, 70)}...`);
        console.log('  ----------------------------------------------------');
      });
    }

    console.log('\nHOW TO INSPECT DIRECTLY IN MONGOSH:');
    console.log('  1. Open terminal and run: mongosh');
    console.log('  2. In mongosh run:        use mapping_vadodara');
    console.log('  3. View stories:          db.stories.find().pretty()');
    console.log('  4. View messages:         db.contacts.find().pretty()');
    console.log('  5. Count records:         db.stories.countDocuments()');
    console.log('======================================================\n');
  } catch (err) {
    console.error('\nERROR: Could not connect to MongoDB!');
    console.error(`Details: ${err.message}`);
    console.log('\nTroubleshooting tips:');
    console.log('  1. Make sure your local MongoDB service is running:');
    console.log('     Run in terminal: net start MongoDB   (or: mongod)');
    console.log('  2. Verify port 27017 is accessible on localhost.\n');
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkDatabase();
