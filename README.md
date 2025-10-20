# Schedule Viewer

This simple web page loads schedule data from JSON files using fetch() with async/await and allows switching between schedules using a dropdown (change event).

How to open locally:
- Open `index.html` in a browser that can fetch local files (or serve the folder with a small HTTP server). For best results, run a simple local server (like `npx http-server` or use the VS Code Live Server extension).

Files added:
- `index.html` - main page with select dropdown and container for schedule cards
- `css/styles.css` - custom styles
- `js/app.js` - JavaScript implementing async fetch and rendering
- `json/*.json` - schedule JSON files (AdityaSchedule.json, EmmaSchedule.json, LiamSchedule.json, SophiaSchedule.json)

Notes:
- The select dropdown uses the `change` event to switch schedules (requirement: non-button event).
- `loadSchedule(fileName)` demonstrates using a template literal inside fetch: `fetch(`./json/${fileName}`)` and uses `insertAdjacentHTML('beforeend', html)` while looping through the classes.
- Error handling displays a friendly message in the status area if fetching fails.
- Classes are sorted by `period` before rendering for extra credit.
