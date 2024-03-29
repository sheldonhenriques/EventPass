document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.getElementById('load-more-btn');
    let page = 1;
  
    loadMoreButton.addEventListener('click', async function() {
      page++; // Increment page number for the next request
  
      // Fetch more events from the server
      const response = await fetch(`/events?page=${page}`);
      const eventList = document.querySelector('.event-list');
      eventList.insertAdjacentHTML('beforeend', await response.text());
    });
});