document.addEventListener('DOMContentLoaded', function() {
    const loadMoreButton = document.getElementById('load-more-btn');
    const loader = document.getElementById('loader');
    let page = 1;
  
    loadMoreButton.addEventListener('click', async function() {
      page++; // Increment page number for the next request
      loader.style.display = 'block';
      loadMoreButton.style.display = 'none';
  
      // Fetch more events from the server
      const response = await fetch(`/events?page=${page}`);
      const eventList = document.querySelector('.event-list');
      eventList.insertAdjacentHTML('beforeend', await response.text());

      loader.style.display = 'none';
      loadMoreButton.style.display = 'block';
    });
});