// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Middleware to enable CORS
app.use((req, res, next) => {
	
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// GET route
app.get('/all', getData);

function getData(request, response) {
    response.send(projectData);
}

// POST route to add incoming data to projectData
app.post('/add', postData);
function postData(request, response) {
    projectData = request.body;
    response.send({ message: "Post received" })
    console.log(projectData)
}
  