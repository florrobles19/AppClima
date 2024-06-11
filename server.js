import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());

const MONGO_URI = 'mongodb+srv://fchazarretarobles:BWW93XDh9VfcimCX@climaapp.rg7usfa.mongodb.net/ClimaApp?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema);

app.post('/api/saveSearch', async (req, res) => {
  try {
    const search = new Search(req.body);
    await search.save();
    res.status(200).send('Search saved successfully');
  } catch (err) {
    console.error('Error saving search:', err);
    res.status(500).send('Error saving search');
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });