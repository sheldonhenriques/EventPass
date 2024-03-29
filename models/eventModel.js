class Event {
  constructor(SEATGEEK_CLIENT_ID, SEATGEEK_SECRET_TOKEN) {
    this.SEATGEEK_CLIENT_ID = SEATGEEK_CLIENT_ID;
    this.SEATGEEK_SECRET_TOKEN = SEATGEEK_SECRET_TOKEN;
  }

  async getEvents(continuationToken = '') {
    try {
        const token = 'Basic ' + Buffer.from(this.SEATGEEK_CLIENT_ID + ':' + this.SEATGEEK_SECRET_TOKEN).toString('base64');
        const response = await fetch('https://api.seatgeek.com/2/events', {
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