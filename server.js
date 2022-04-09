const express = require("express");
const db = require('./db/db.json')
const path = require('path');
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.json(db)
})

app.post('/api/notes', (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid.v4()
  }
  db.push(newNote)
  console.log(db);
})

app.delete('/api/notes/:id', (req, res) => {
  deletedId = req.params.id;
  db.forEach((note, i) => {
    if (note.id === deletedId) {
      db.splice(i, 1);
    }
  })
  console.log(db)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);