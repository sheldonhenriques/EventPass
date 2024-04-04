require("dotenv").config();
const express = require("express");
const path = require('path');
const EventController = require('../controllers/eventController');
const IndextController = require('../controllers/indexController');

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

const SEATGEEK_CLIENT_ID = process.env.SEATGEEK_CLIENT_ID;
const SEATGEEK_SECRET_TOKEN = process.env.SEATGEEK_SECRET_TOKEN;

const indextController = new IndextController();
const eventController = new EventController(SEATGEEK_CLIENT_ID, SEATGEEK_SECRET_TOKEN);


app.get('/', (req, res) => indextController.getHome(req, res));

app.get('/events', (req, res) => eventController.getEvents(req, res));

app.get('/eventsPagination', (req, res) => eventController.getEventsPagination(req, res));

app.get('/eventsRecommendations', (req, res) => eventController.getEventsRecommendations(req, res));

app.get('/categories', (req, res) => eventController.getEventCategories(req, res));

app.post('/search', (req, res) => eventController.getSearchEvents(req, res));

app.get('/indexMain', (req, res) => indextController.getIndexMain(req, res));


app.listen(port, () => {
  console.log({
    level: "info",
    message: `Express is listening at http://localhost:${port}`,
  });
});