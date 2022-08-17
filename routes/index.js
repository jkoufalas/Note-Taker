const express = require('express');
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile, deleteFromFile } = require('../helpers/fsUtils');

const app = express();

// GET Route for retrieving /api/notes
app.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes to /api/notes
app.post('/', (req, res) => {
  // Destructuring assignment for the JSON items in req.body
  const { title, text } = req.body;

  // Even though the client side has a restriction for both title and text to have anything 
  // within them before the submit button is visible this check makes sure that if anyone 
  // posts manually it cannot apply
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      // create a unique id to differentiate from other notes
      id: uuid(),
    };
    //append new note to JSON storage file
    readAndAppend(newNote, './db/db.json');

    //setup response to send back to page to complete POST
    const response = {
      status: 'success',
      body: newNote,
    };

    //send response in JSON format
    res.status(201).json(response);
  } else {
    //if the title or text is empty send error response
    res.status(500).json('Error in posting task');
  }
});

app.delete('/:id', (req, res) => {
  deleteFromFile(req.params.id, './db/db.json');

  const response = {
    status: 'success',
  };
  res.status(201).json(response);

});

module.exports = app;
