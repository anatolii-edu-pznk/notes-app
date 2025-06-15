const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/Note');

/*
  Replace with your actual MongoDB connection string
  Make sure to replace <username> and <password> with your actual MongoDB credentials
  and ensure the database name is correct.
*/
const DB_URI = 'mongodb://<username>:<password>@cluster0.<name>/notes_app?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const PORT = 3000;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

/**
 * Home screen with list of saved notes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
app.get('/', async (req, res) => {
  //TODO: Replace hardcode notes by the values from the database and render them
  const notes = [
    { _id: '1', title: 'First Hardcoded Note' },
    { _id: '2', title: 'Another Example Note' },
    { _id: '3', title: 'Note with Fake ID' }
  ];

  res.render('index', { notes });
});

/**
 * Route to render the new note form
 * @param {Object} req - The request object
 * @param {Object} res - The response object  
 * * @returns {void}
 */
app.get('/notes/new', (req, res) => {
  res.render('new');
});

/**
 * Route to handle the creation of a new note
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
app.post('/notes', async (req, res) => {
  // TODO: Replace by the note creation to database request
  res.redirect('/');
});

/**
 * Route to render the details of a specific note
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
app.get('/notes/:id', async (req, res) => {
  // TODO: Replace hardcode note by the value from the database and render it
  // If note not found, handle the error appropriately
  const note = {
    _id: req.params.id,
    title: 'Sample Note',
    content: 'This is a sample note content.',
    createdAt: new Date()
  };
  res.render('details', { note });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
