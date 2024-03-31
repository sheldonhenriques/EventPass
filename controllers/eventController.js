const moment = require('moment-timezone');
const Event = require('../models/eventModel');

class EventController {
  constructor(SEATGEEK_CLIENT_ID, SEATGEEK_SECRET_TOKEN) {
    this.event = new Event(SEATGEEK_CLIENT_ID, SEATGEEK_SECRET_TOKEN);
    this.timezone = 'America/Los_Angeles'
  }

  async getEvents(req, res) {
    try {
      const eventData = await this.event.getEvents();
      eventData.events.forEach(event => {
        event.startDateFormatted = moment.tz(event.datetime_local, this.timezone).format('ddd, MMM D');
        event.startDateTimeFormatted = moment.tz(event.datetime_local, this.timezone).format('ddd, MMM D • h:mm A');
      });
      res.render('./events/event', { events: eventData.events, paginated: true});
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getEventsPagination(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const per_page = parseInt(req.query.per_page) || 10;
      const eventData = await this.event.getEvents(page, per_page);
      res.render('./events/event-paginated', { events: eventData.events, paginated: true}, (err, html) => {
        if (err)  throw err;
        else  res.send(html);
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventsRecommendations(req, res) {
    try {
      const event_id = req.query.event_id;
      const eventData = await this.event.getEventsRecommendations(event_id);
      eventData.recommendations.forEach(event => {
        event.startDateFormatted = moment.tz(event.datetime_local, this.timezone).format('ddd, MMM D');
        event.startDateTimeFormatted = moment.tz(event.datetime_local, this.timezone).format('ddd, MMM D • h:mm A');
      });
      res.render('./events/event', { events: eventData.recommendations, paginated: false });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getEventCategories(req, res) {
    try {
      const categoriesData = await this.event.getEventsCategories();
      res.render('./categories/category', { categories: categoriesData.taxonomies.slice(0, 6) });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EventController;
