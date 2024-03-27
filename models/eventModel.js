class Event {
  constructor(token) {
    this.token = token;
  }

  async getEvents() {
    try {
        const response = await fetch('https://www.eventbriteapi.com/v3/destination/search/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "event_search": {
              "page_size": 30,
              "image": true,
              "places": ["85923179"],
              "dates": ["current_future"],
              "dedup": true
            }
          })
        })
        if (!response.ok) throw new Error(`Failed to fetch events, status code: ${response.status}`);
        const eventData = await response.json();
        return eventData.events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
}

module.exports = Event;