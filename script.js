const status = document.getElementById('status');
const cards = document.getElementById('cards');
const select = document.getElementById('scheduleSelect');
const pageTitle = document.getElementById('pageTitle');
const mySchedule = 'AdityaSchedule.json';
const friend1 = 'EmmaSchedule.json';
const friend2 = 'LiamSchedule.json';
const friend3 = 'SophiaSchedule.json';
function showError(message) {
  status.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
}
async function loadSchedule(fileName) {
  status.innerHTML = `<div class="alert alert-info">Loading schedule...</div>`;
  cards.innerHTML = '';
  try {
    const response = await fetch(`./json/${fileName}`);
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();
    data.sort((a, b) => a.period - b.period);
    status.innerHTML = '';
    const who = fileName.replace('Schedule.json', '');
    pageTitle.textContent = `${who}'s Class Schedule`;
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
      cards.insertAdjacentHTML('beforeend', html);
    });