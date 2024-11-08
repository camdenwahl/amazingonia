// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const path = require('path');

dotenv.config()

// Create Express app
const app = express();
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Middleware
app.use(cors());
app.use(bodyParser.json());

const mongoURI = `mongodb+srv://${process.env.APP_NAME}:${process.env.APP_PASS}@cluster0.n7b0nqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/data_collection`;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const DataSchema = new mongoose.Schema({
    userInfo: {
      age: Number,
      gender: String,
      experience: String,
    },
    designOrder: [String],
    firstDesignShown: String, 
    taskTimings: {
      firstTaskTime: Number,
      secondTaskTime: Number,
    },
    surveyResponses: {
      difficulty1: Number,
      difficulty2: Number,
      preferredDesign: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

// Create a model from the schema
const DataModel = mongoose.model('Data', DataSchema);

// API endpoint to receive data
app.post('/api/submit-data', async (req, res) => {
  try {
    const data = req.body;

    // Create a new document
    const newData = new DataModel(data);

    // Save to MongoDB
    await newData.save();

    res.status(200).send({ message: 'Data received and stored' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send({ message: 'Error saving data', error });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
