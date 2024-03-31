document.addEventListener("DOMContentLoaded", function() {
  const fetchEventsPromise = fetch("/events")
    .then(response => response.text())
    .then(data => {
      document.getElementById("eventsContainer").innerHTML = data;
    })
    .catch(error => console.error("Error fetching events:", error));

  const fetchCategoriesPromise = fetch("/categories")
    .then(response => response.text())
    .then(data => {
      document.getElementById("categoriesContainer").innerHTML = data;
    })
    .catch(error => console.error("Error fetching categories:", error));

  // Wait for both fetch promises to resolve before attaching the event listener
  Promise.all([fetchEventsPromise, fetchCategoriesPromise])
    .then(() => {
      const loadMoreButton = document.getElementById('load-more-btn');
      const loader = document.getElementById('loader');
      let page = 1;

      loadMoreButton.addEventListener('click', async function() {
        page++; // Increment page number for the next request
        loader.style.display = 'block';
        loadMoreButton.style.display = 'none';

        // Fetch more events from the server
        const response = await fetch(`/eventsPagination?page=${page}`);
        const eventList = document.querySelector('.event-list');
        eventList.insertAdjacentHTML('beforeend', await response.text());

        loader.style.display = 'none';
        loadMoreButton.style.display = 'block';
      });
    })
    .catch(error => console.error("Error setting up event listener:", error));
});