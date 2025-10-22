const status = document.getElementById('status');
const cards = document.getElementById('cards');
const select = document.getElementById('scheduleSelect');
const pageTitle = document.getElementById('pageTitle');

// Map JSON files to friend names
const schedules = {
  Aditya: 'json/Aditya.json',
  James: 'json/James.json',
  Sathvik: 'json/Sathvik.json',
  Ethan: 'json/Ethan.json'
};

// Load and display schedule
async function loadSchedule(person) {
  status.textContent = "Loading schedule...";
  cards.innerHTML = '';

  const fileName = schedules[person];
  const response = await fetch(`${fileName}?t=${Date.now()}`);
  const data = await response.json();

  // Sort by period
  data.sort((a, b) => parseInt(a.period) - parseInt(b.period));

  // Clear status message
  status.textContent = '';
  pageTitle.textContent = `${person}'s Class Schedule`;

  // Generate cards for each class
  data.forEach((cls) => {
    const html = `
      <article class="col-12 col-md-6 col-lg-4">
        <div class="card card-custom h-100 shadow-sm">
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
    cards.insertAdjacentHTML('beforeend', html);
  });
}

// Load Aditya's schedule first
loadSchedule('Aditya');

// When user changes dropdown
select.addEventListener('change', () => {
  const selectedOption = select.options[select.selectedIndex].text;
  loadSchedule(selectedOption);
});
