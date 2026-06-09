// ── API base URL
var API_BASE = "";  // relative — works on any host

// ── Global state
var allPlayers = [];
var activeGame = "all";
var activeRank = "all";
var searchQuery = "";

// ── Fetch player data FROM SERVER (not JSON file)
fetch(API_BASE + "/players")
  .then(function (r) { return r.json(); })
  .then(function (players) {
    allPlayers = players;
    buildFilters(players);
    renderPlayers(players, false);
    wireControls();
  })
  .catch(function () {
    var container = document.getElementById("playersContainer");
    container.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-icon">⚠️</div>' +
        '<div class="empty-title">Could not connect to API</div>' +
        '<div class="empty-sub">Make sure the backend server is running: <code>node server.js</code> in the backend folder.</div>' +
      '</div>';
  });

// ── Build game filter chips dynamically
function buildFilters(players) {
  var games = ["all"];
  players.forEach(function (p) {
    if (!games.includes(p.game)) games.push(p.game);
  });
  var gameBar = document.getElementById("gameFilterBar");
  games.forEach(function (g) {
    var btn = document.createElement("button");
    btn.className = "filter-chip" + (g === "all" ? " active" : "");
    btn.dataset.game = g;
    btn.textContent = g === "all" ? "All Games" : g;
    gameBar.appendChild(btn);
  });
}

// ── Wire up all controls
function wireControls() {
  document.getElementById("searchInput").addEventListener("input", function () {
    searchQuery = this.value.trim().toLowerCase();
    applyFilters();
  });

  // Game chips — calls GET /players?game=<game> API endpoint
  document.getElementById("gameFilterBar").addEventListener("click", function (e) {
    var chip = e.target.closest(".filter-chip");
    if (!chip) return;
    document.querySelectorAll("#gameFilterBar .filter-chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    activeGame = chip.dataset.game;

    var url = activeGame === "all"
      ? API_BASE + "/players"
      : API_BASE + "/players?game=" + encodeURIComponent(activeGame);

    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (players) {
        allPlayers = players;
        applyFilters();
      });
  });

  document.getElementById("rankFilter").addEventListener("change", function () {
    activeRank = this.value;
    applyFilters();
  });

  document.getElementById("clearBtn").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    searchQuery = "";
    activeGame = "all";
    activeRank = "all";
    document.querySelectorAll("#gameFilterBar .filter-chip").forEach(function (c) { c.classList.remove("active"); });
    document.querySelector('#gameFilterBar .filter-chip[data-game="all"]').classList.add("active");
    document.getElementById("rankFilter").value = "all";
    fetch(API_BASE + "/players")
      .then(function (r) { return r.json(); })
      .then(function (players) {
        allPlayers = players;
        applyFilters();
      });
  });
}

// ── Filter logic (rank + search run client-side after API fetch)
function applyFilters() {
  var result = allPlayers.filter(function (p) {
    var matchName = p.name.toLowerCase().includes(searchQuery);
    var matchRank = true;
    if (activeRank === "top3") matchRank = p.rank <= 3;
    else if (activeRank === "top5") matchRank = p.rank <= 5;
    else if (activeRank === "top10") matchRank = p.rank <= 10;
    return matchName && matchRank;
  });
  result.sort(function (a, b) { return a.rank - b.rank; });
  updateResultCount(result.length);
  renderPlayers(result, true);
}

function updateResultCount(count) {
  var el = document.getElementById("resultCount");
  el.textContent = count + " player" + (count !== 1 ? "s" : "") + " found";
}

function renderPlayers(players, animate) {
  var container = document.getElementById("playersContainer");
  if (animate) {
    var existing = container.querySelectorAll(".card-flip-outer");
    existing.forEach(function (c) { c.classList.add("flip-out"); });
    setTimeout(function () {
      container.innerHTML = "";
      if (players.length === 0) showEmpty(container);
      else injectCards(players, container, true);
    }, 320);
  } else {
    container.innerHTML = "";
    if (players.length === 0) showEmpty(container);
    else injectCards(players, container, false);
  }
}

function showEmpty(container) {
  container.innerHTML =
    '<div class="empty-state">' +
      '<div class="empty-icon">⚔️</div>' +
      '<div class="empty-title">No players found</div>' +
      '<div class="empty-sub">Try adjusting your filters or search query.</div>' +
    '</div>';
}

function injectCards(players, container, flipIn) {
  players.forEach(function (player, i) {
    var isTop1 = player.rank === 1;
    var isTop3 = player.rank <= 3;
    var isTop5 = player.rank <= 5;
    var badgeHTML = "";
    if (isTop1) {
      badgeHTML = '<div class="diamond-badge diamond-1"><div class="diamond-gem">◆</div><span class="diamond-label">CHAMPION</span></div>';
    } else if (isTop3) {
      badgeHTML = '<div class="diamond-badge diamond-top3"><div class="diamond-gem">◈</div><span class="diamond-label">TOP 3</span></div>';
    } else if (isTop5) {
      badgeHTML = '<div class="diamond-badge diamond-top5"><div class="diamond-gem">◇</div><span class="diamond-label">TOP 5</span></div>';
    }
    var gameColors = { "Valorant": "#ff4655", "CS2": "#f0a500", "League of Legends": "#C69B3A", "Apex Legends": "#CD4D13" };
    var gameColor = gameColors[player.game] || "#1E90FF";
    var glowClass = isTop1 ? " glow-champion" : isTop3 ? " glow-top3" : "";
    var outer = document.createElement("div");
    outer.className = "card-flip-outer" + (flipIn ? " flip-in" : "");
    outer.style.animationDelay = (i * 80) + "ms";
    outer.innerHTML =
      '<div class="card' + glowClass + '">' +
        '<div class="card-img-wrapper">' + badgeHTML +
          '<img class="card-photo" src="' + player.photo + '" alt="' + player.name + '">' +
          (isTop1 ? '<div class="champion-ring"></div>' : '') +
        '</div>' +
        '<div class="card-corner"></div>' +
        '<div class="rank-badge"><span class="rank-num">#' + player.rank + '</span><span class="rank-lbl">World Rank</span></div>' +
        '<div class="card-body">' +
          '<div class="card-country">' + player.country + '</div>' +
          '<div class="card-name">' + player.name + '</div>' +
          '<div class="card-game-tag" style="--gtag-color:' + gameColor + '">' + player.game + '</div>' +
          '<div class="card-stats">' +
            '<div class="cs"><span class="cs-val">' + player.wins + '</span><span class="cs-key">Wins</span></div>' +
            '<div class="cs"><span class="cs-val">' + player.losses + '</span><span class="cs-key">Losses</span></div>' +
            '<div class="cs"><span class="cs-val">' + player.winRate + '</span><span class="cs-key">Win Rate</span></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    container.appendChild(outer);
    if (!flipIn) {
      outer.style.opacity = "0";
      outer.style.transform = "translateY(30px)";
      setTimeout(function () {
        outer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        outer.style.opacity = "1";
        outer.style.transform = "translateY(0)";
      }, 60 + i * 90);
    }
  });
}