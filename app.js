const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const search = document.querySelector("#globalSearch");
const eventBoard = document.querySelector("[data-event-board]");
const rankingBody = document.querySelector("[data-ranking-body]");
const formStatus = document.querySelector("[data-form-status]");

const eventViews = {
  month: [
    ["Jun 27", "Luzon Youth Invitational", "Tournament / 12U-18U / Metro Manila"],
    ["Jul 04", "Visayas Softball Development Camp", "Clinic / Girls youth / Cebu"],
    ["Jul 11", "Mindanao Umpire Accreditation Day", "Umpire clinic / Open / Davao"]
  ],
  week: [
    ["Mon", "Batting cage fundamentals", "Clinic / Beginners / Quezon City"],
    ["Wed", "Baseball5 school roadshow", "Development / Mixed youth / Pasig"],
    ["Sat", "Junior finals doubleheader", "Tournament / 15U / Alabang"]
  ],
  list: [
    ["Open", "Coach certification waitlist", "Seminar / National / Online"],
    ["Open", "College recruitment showcase", "Tryout / 18U / Laguna"],
    ["Open", "Slow-pitch community night", "Softball / Open / Makati"]
  ]
};

const rankings = {
  team: [
    ["1", "Manila Green Sox", "NCR", "98.4"],
    ["2", "Cebu Diamond Club", "VII", "95.8"],
    ["3", "Davao South Sluggers", "XI", "93.2"]
  ],
  batting: [
    ["1", "J. Cruz", "NCR", ".428"],
    ["2", "A. Santos", "IV-A", ".401"],
    ["3", "M. Dela Pena", "VII", ".389"]
  ],
  pitching: [
    ["1", "R. Lim", "NCR", "1.12 ERA"],
    ["2", "K. Navarro", "XI", "1.44 ERA"],
    ["3", "T. Garcia", "III", "1.58 ERA"]
  ]
};

function renderEvents(view) {
  eventBoard.innerHTML = eventViews[view]
    .map(([date, title, meta]) => `<article><span>${date}</span><div><h3>${title}</h3><p>${meta}</p></div></article>`)
    .join("");
}

function renderRankings(type) {
  rankingBody.innerHTML = rankings[type]
    .map(([rank, name, region, rating]) => `<tr><td>${rank}</td><td>${name}</td><td>${region}</td><td>${rating}</td></tr>`)
    .join("");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

document.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderEvents(button.dataset.view);
  });
});

document.querySelectorAll("[data-rank]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-rank]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderRankings(button.dataset.rank);
  });
});

document.querySelector(".search-box")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const term = search.value.trim();
  if (!term) return;
  search.value = `${term} - results coming soon`;
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks. You are on the Playball PH update list.";
});
