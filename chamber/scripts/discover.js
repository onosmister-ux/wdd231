const cardsContainer = document.querySelector('#cards');
const visitMessage = document.querySelector('#visitMessage');

// Fetch JSON data with try...catch - rubric #9
async function getPlaces() {
  try {
    const response = await fetch('data/places.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayPlaces(data);
  } catch (error) {
    console.error('Error fetching places:', error);
    cardsContainer.innerHTML = '<p>Error loading places. Please try again later.</p>';
  }
}

function displayPlaces(places) {
  places.forEach(place => {
    const card = document.createElement('section');
    card.classList.add('place-card');
    
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
      </figure>
      <address>${place.address}</address>
      <p class="description">${place.description}</p>
      <button type="button">Learn More</button>
    `;
    
    const button = card.querySelector('button');
    button.addEventListener('click', () => {
      window.open(place.link, '_blank');
    });
    
    cardsContainer.appendChild(card);
  });
}

// localStorage visit message - rubric #7
function displayVisitMessage() {
  const msToDays = 86400000;
  const lastVisit = localStorage.getItem('discoverLastVisit');
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = (currentVisit - Number(lastVisit)) / msToDays;
    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(daysBetween);
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }

  localStorage.setItem('discoverLastVisit', currentVisit);
}

// Run functions
getPlaces();
displayVisitMessage();