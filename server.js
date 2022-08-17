const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
//this just changes the colour of the console log and prints out the request method and path
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use modular routing to separate all routes to /api/notes
app.use('/api/notes', api);

//static routes in public folder
app.use(express.static('public'));

// get route /notes to notes.html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// wildcard (*), means any route that hasn't been dealt with above will redirect to homepage
// this is better than res.sendfile as res.redirect will still store the route in the web location
// redirect will maintain the location as the root
app.get('*', (req, res) =>
  res.redirect('/')
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
 