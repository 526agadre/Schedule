// app.js
// This script loads schedule JSON files using async/await and fetch.
// It accepts a fileName parameter and fetches from ./json/${fileName}
// The page uses a <select> element; change events trigger schedule switching.

const status = document.getElementById('status');
const cards = document.getElementById('cards');
const select = document.getElementById('scheduleSelect');
const pageTitle = document.getElementById('pageTitle');

// Variables for each JSON file used
const mySchedule = 'AdityaSchedule.json';
const friend1 = 'EmmaSchedule.json';
const friend2 = 'LiamSchedule.json';
const friend3 = 'SophiaSchedule.json';

// Helper: render a friendly error message in the status area
function showError(message) {
  status.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}

// Async function that loads a schedule fileName and renders cards
async function loadSchedule(fileName) {
  // Show loading indicator and clear old cards
  status.innerHTML = `<div class="alert alert-info">Loading schedule...</div>`;
  cards.innerHTML = '';

  try {
    // Use template literal in fetch path
    const response = await fetch(`./json/${fileName}`);
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();

    // Optional: sort by period for extra credit
    data.sort((a, b) => a.period - b.period);

    // Clear loading status
    status.innerHTML = '';

    // Update page title to show whose schedule is displayed
    const who = fileName.replace('Schedule.json', '');
    pageTitle.textContent = `${who}'s Class Schedule`;

    // Loop through classes and insert cards incrementally
    data.forEach((cls) => {
      const html = `
        <article class="col-12 col-md-6 col-lg-4">
          <div class="card card-custom h-100">
            <div class="card-body">
              <h5 class="card-title">${cls.className}</h5>
              <p class="card-text mb-1"><strong>Period:</strong> ${cls.period}</p>
              <p class="card-text mb-1"><strong>Teacher:</strong> ${cls.teacher}</p>
              <p class="card-text mb-1"><strong>Room:</strong> ${cls.roomNumber}</p>
              <p class="card-text"><em>${cls.subjectArea}</em></p>
            </div>
          </div>
        </article>
      `;
      // Insert each card at the end of the container
      cards.insertAdjacentHTML('beforeend', html);
    });

  } catch (err) {
    console.error(err);
    showError('Failed to load schedule. Please try again later.');
  }
}

// Event-driven switching: change event on the select dropdown
select.addEventListener('change', (e) => {
  const file = e.target.value;
  loadSchedule(file);
});

// On page load, automatically load my schedule
window.addEventListener('DOMContentLoaded', () => {
  // Ensure the select reflects the default
  select.value = mySchedule;
  loadSchedule(mySchedule);
});

// Comments: loadSchedule(fileName) uses a template literal inside fetch:
// fetch(`./json/${fileName}`)
// The fileName parameter is passed into the async function and used directly in the path.
