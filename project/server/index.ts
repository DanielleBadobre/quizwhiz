import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { CONFIG } from './config/index.js';
import { deckRoutes } from './routes/deck.routes.js';
import { errorHandler, notFound } from './middleware/error.js';

const app = express();

// Connect to MongoDB
mongoose.connect(CONFIG.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Add this before your middleware setup
app.get('/', (req, res) => {
  res.json({
    message: 'QuizzFairy API is running',
    endpoints: {
      decks: '/api/decks',
      createFromText: '/api/decks/text',
      createFromTopic: '/api/decks/topic',
      getDeck: '/api/decks/:id',
    }
  });
});

  // Middleware
app.use(cors({
  origin: CONFIG.CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimit({
  windowMs: CONFIG.RATE_LIMIT.WINDOW_MS,
  max: CONFIG.RATE_LIMIT.MAX_REQUESTS
}));

// Routes
app.use('/api/decks', deckRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);


// Start server
app.listen(Number(CONFIG.PORT), '0.0.0.0', () => {
  console.log(`Server running on port ${CONFIG.PORT}`);
});

export default app;