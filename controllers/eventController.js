const moment = require('moment-timezone');
const Event = require('../models/eventModel');

class EventController {
  constructor(token) {
    this.event = new Event(token);
  }

  async getEvents(req, res) {
    try {
      const eventData = await this.event.getEvents();
      eventData.results.forEach(event => {
        event.startDateFormatted = moment.tz(`${event.start_date}T${event.start_time}:00`, event.timezone).format('ddd, MMM D • h:mm A');
        event.endDateFormatted = moment.tz(`${event.end_date}T${event.end_time}:00`, event.timezone).format('ddd, MMM D • h:mm A');
      });
      res.render('./events/event', { events: eventData.results });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EventController;
