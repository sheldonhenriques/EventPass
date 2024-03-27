const Event = require('../models/eventModel');

class EventController {
  constructor(token) {
    this.event = new Event(token);
  }

  async getEvents(req, res) {
    try {
      const eventData = await this.event.getEvents();
      res.render('event', { events: eventData.results });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = EventController;
