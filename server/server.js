import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Story } from './models/Story.js';
import { Contact } from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mapping_vadodara';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'vadodara_admin_2026';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Admin Security Middleware
const requireAdmin = (req, res, next) => {
  const key = req.headers['x-admin-key'] || (req.headers['authorization']?.replace(/^Bearer\s+/i, ''));
  if (!key || key !== ADMIN_SECRET) {
    return res.status(401).json({
      error: 'Unauthorized: Administrator access required to view or modify database records.',
    });
  }
  next();
};

// MongoDB Connection
let isConnected = false;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${MONGODB_URI}`);
  } catch (err) {
    isConnected = false;
    console.error(`[MongoDB] Connection error:`, err.message);
  }
}

mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('[MongoDB] Connection state: Connected');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[MongoDB] Connection state: Disconnected');
});

// Health check endpoint (Public status)
app.get('/api/health', (req, res) => {
  const readyState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({
    ok: readyState === 1,
    status: states[readyState] || 'Unknown',
    database: 'mapping_vadodara',
    uptime: process.uptime(),
  });
});

// ============ Admin Authentication API ============

// Verify admin password
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ ok: false, error: 'Password is required' });
  }

  if (password === ADMIN_SECRET) {
    return res.json({
      ok: true,
      token: ADMIN_SECRET,
      message: 'Admin authorization successful',
    });
  }

  return res.status(401).json({
    ok: false,
    error: 'Incorrect administrator password.',
  });
});

// Verify existing token
app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({ ok: true, message: 'Admin token is valid' });
});

// Database statistics endpoint (Protected)
app.get('/api/stats', requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const [storiesCount, contactsCount] = await Promise.all([
      Story.countDocuments(),
      Contact.countDocuments(),
    ]);
    res.json({
      stories: storiesCount,
      contacts: contactsCount,
      database: 'mapping_vadodara',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ Stories API ============

// Get all stories (Public read for community archive)
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve stories', details: err.message });
  }
});

// Create a new story (Public submission)
app.post('/api/stories', async (req, res) => {
  try {
    const { name, email, title, location, category, description, photoName, photoData } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!title || title.trim().length < 5) {
      return res.status(400).json({ error: 'Title must be at least 5 characters long' });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ error: 'Location is required' });
    }
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }
    if (!description || description.trim().length < 20) {
      return res.status(400).json({ error: 'Description must be at least 20 characters' });
    }

    const story = new Story({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      title: title.trim(),
      location: location.trim(),
      category,
      description: description.trim(),
      photoName: photoName || null,
      photoData: photoData || null,
      status: 'community',
    });

    const savedStory = await story.save();
    console.log(`[Stories] New story saved to MongoDB: "${savedStory.title}" (_id: ${savedStory._id})`);
    res.status(201).json(savedStory);
  } catch (err) {
    console.error('[Stories] Error saving story:', err);
    res.status(500).json({ error: 'Failed to save story to MongoDB', details: err.message });
  }
});

// Delete a single story by ID (PROTECTED - Admin Only)
app.delete('/api/stories/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Story.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Story not found' });
    }
    console.log(`[Stories] [Admin] Deleted story: ${id}`);
    res.json({ message: 'Story deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story', details: err.message });
  }
});

// Clear all stories (PROTECTED - Admin Only)
app.delete('/api/stories', requireAdmin, async (req, res) => {
  try {
    const result = await Story.deleteMany({});
    console.log(`[Stories] [Admin] Cleared all stories (${result.deletedCount} removed)`);
    res.json({ message: 'All community stories cleared', count: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear stories', details: err.message });
  }
});

// ============ Contacts API ============

// Get all contact messages (PROTECTED - Admin Only, contains private emails)
app.get('/api/contacts', requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages', details: err.message });
  }
});

// Submit a contact message (Public submission)
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!message || message.trim().length < 15) {
      return res.status(400).json({ error: 'Message must be at least 15 characters long' });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      topic: topic || 'Contribute a story',
      message: message.trim(),
    });

    const savedContact = await contact.save();
    console.log(`[Contact] Message saved to MongoDB from ${savedContact.name}`);
    res.status(201).json(savedContact);
  } catch (err) {
    console.error('[Contact] Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message to MongoDB', details: err.message });
  }
});

// Delete a contact message (PROTECTED - Admin Only)
app.delete('/api/contacts/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    console.log(`[Contact] [Admin] Deleted message: ${id}`);
    res.json({ message: 'Message deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message', details: err.message });
  }
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  Mapping Vadodara Backend Server running!`);
    console.log(`  API URL:        http://127.0.0.1:${PORT}`);
    console.log(`  MongoDB Target: ${MONGODB_URI}`);
    console.log(`  Admin Secret:   [PROTECTED]`);
    console.log(`======================================================\n`);
  });
});
