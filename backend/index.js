const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/catdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Cat model
const Cat = mongoose.model('Cat', new mongoose.Schema({
  name: { type: String, required: true },
}));

// Routes
app.get('/cats', async (req, res) => {
  const cats = await Cat.find();
  res.json(cats);
});

app.post('/cats', async (req, res) => {
  const newCat = new Cat({ name: req.body.name });
  await newCat.save();
  res.status(201).json(newCat);
});

app.delete('/cats/:id', async (req, res) => {
  console.log(req.params.id);
  await Cat.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});