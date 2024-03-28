require("dotenv").config();
const express = require("express");
const path = require('path');
const EventController = require('../controllers/eventController');

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;
const eventController = new EventController(EVENTBRITE_TOKEN);

app.get('/', (req, res) => eventController.getEvents(req, res));

app.listen(port, () => {
  console.log({
    level: "info",
    message: `Express is listening at http://localhost:${port}`,
  });
});