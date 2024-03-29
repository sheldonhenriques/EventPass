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
      res.render('./events/event', { events: eventData.events, eventObject: this.event });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EventController;
