import mongoose, { Schema, Document, Model } from 'mongoose';

// Base interface for Flashcard properties
export interface IFlashcard {
  question: string;
  answer: string;
  tags?: string[];
  lastReviewed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Flashcard document
export interface FlashcardDocument extends IFlashcard, Document {}

// Interface for Flashcard model
export interface FlashcardModel extends Model<FlashcardDocument> {
}

const FlashcardSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    minlength: [1, 'Question cannot be empty'],
    maxlength: [1000, 'Question is too long']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    minlength: [1, 'Answer cannot be empty'],
    maxlength: [1000, 'Answer is too long']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Tag is too long']
  }],
  lastReviewed: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

// indexes for better query performance
FlashcardSchema.index({ tags: 1 });
FlashcardSchema.index({ lastReviewed: 1 });

export const FlashcardModel = mongoose.model<FlashcardDocument, FlashcardModel>('Flashcard', FlashcardSchema);