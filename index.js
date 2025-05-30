const container = document.getElementById("fixtures-container");
const loadMoreBtn = document.getElementById("load-more");

let fixtures = [];
let currentIndex = 0;
const batchSize = 10;

// Fetch and store fixtures
fetch("https://v3.football.api-sports.io/fixtures?date=2025-05-30", {
  method: "GET",
  headers: {
    "x-apisports-key": "e6277328be192f231efb543efaa7616f",
  },
})
  .then((res) => res.json())
  .then((data) => {
    fixtures = data.response;
    console.log("fixtures", fixtures);
    showFixtures();
  })
  .catch((err) => console.error(err));

function showFixtures() {
  const nextFixtures = fixtures.slice(currentIndex, currentIndex + batchSize);
  nextFixtures.forEach((fixture) => {
    const date = new Date(fixture.fixture.date).toLocaleString();
    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;
    const homeLogo = fixture.teams.home.logo;
    const awayLogo = fixture.teams.away.logo;
    const leagueName = fixture.league.name;
    const leagueLogo = fixture.league.logo;

    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card fixture-card p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="d-flex align-items-center">
            <img src="${leagueLogo}" alt="${leagueName}" width="24" height="24" class="me-2">
            <strong>${leagueName}</strong>
          </div>
          <small class="text-muted">${date}</small>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <div class="text-center col-md-4">
            <img src="${homeLogo}" alt="${homeTeam}" width="40" height="40"><br>
            ${homeTeam}
          </div>
          <strong>vs</strong>
          <div class="text-center col-md-4">
            <img src="${awayLogo}" alt="${awayTeam}" width="40" height="40"><br>
            ${awayTeam}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  currentIndex += batchSize;

  if (currentIndex >= fixtures.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Load more on button click
loadMoreBtn.addEventListener("click", showFixtures);
