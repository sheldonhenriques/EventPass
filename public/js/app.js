document.addEventListener("DOMContentLoaded", function() {

  const mainContainer = document.getElementById("mainContainer");

  const searchInputs = document.querySelectorAll("input[type='search']");
  searchInputs.forEach(input => {
    input.addEventListener("input", handleSearch);
  });

  function handleSearch() {
    const searchTerm = Array.from(searchInputs)
      .map(input => input.value.trim())
      .filter(value => value !== "")
      .join(" ");

      fetch(`/indexMain?searchTerm=${searchTerm}`)
      .then(response => response.text())
      .then(data => {
        mainContainer.innerHTML = data;
      }).then( data => {
        if(searchTerm != ''){
          fetch('/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm })
          })
          .then(response => response.text())
          .then(data => {
            document.getElementById("searchEventsContainer").innerHTML = data;
          });
        } else {
          getIndexMainData();
        }
      })
      .catch(error => console.error("Error fetching events:", error));
  }

  const mainConatinerPromise = fetch(`/indexMain`)
      .then(response => response.text())
      .then(data => {
        mainContainer.innerHTML = data;
      })
      .catch(error => console.error("Error fetching events:", error));

  const getIndexMainData = () => {
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
  Promise.all([mainConatinerPromise])
  .then(() => {
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
    })
  .catch(error => console.error("Error setting up event listener:", error));
  }
  getIndexMainData();
  
});