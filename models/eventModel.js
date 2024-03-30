class Event {
  constructor(SEATGEEK_CLIENT_ID, SEATGEEK_SECRET_TOKEN) {
    this.SEATGEEK_CLIENT_ID = SEATGEEK_CLIENT_ID;
    this.SEATGEEK_SECRET_TOKEN = SEATGEEK_SECRET_TOKEN;
  }

  async getEvents(page = 1, per_page = 10) {
    try {
        const token = 'Basic ' + Buffer.from(this.SEATGEEK_CLIENT_ID + ':' + this.SEATGEEK_SECRET_TOKEN).toString('base64');
        const response = await fetch(`https://api.seatgeek.com/2/events?page=${page}&per_page=${per_page}`, {
          method: 'GET',
          headers: {
            Authorization:  token
          }
        })
        if (!response.ok) throw new Error(`Failed to fetch events, status code: ${response.status}`);
        const eventData = await response.json();
        return eventData;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getEventsRecommendations( event_id = '', page = 1, per_page = 3) {
    try {
        const token = 'Basic ' + Buffer.from(this.SEATGEEK_CLIENT_ID + ':' + this.SEATGEEK_SECRET_TOKEN).toString('base64');
        const response = await fetch(`https://api.seatgeek.com/2/recommendations?page=${page}&per_page=${per_page}&events.id=${event_id}`, {
          method: 'GET',
          headers: {
            Authorization:  token
          }
        })
        if (!response.ok) throw new Error(`Failed to fetch events, status code: ${response.status}`);
        const eventData = await response.json();
        return eventData;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
}

module.exports = Event;