import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  photoName: {
    type: String,
    default: null,
  },
  photoData: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'community',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Story = mongoose.model('Story', storySchema);
