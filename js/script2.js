const ATHLETES = [
    { id: 1, name: 'Elara Vance', sport: 'track', discipline: 'Track & Field', country: 'USA', img: '../imgs/ath1.jpg', bio: 'Gold medalist in 400m. A powerhouse with tactical speed.', medals: { gold: 1, silver: 0, bronze: 0 } },
    { id: 2, name: 'Kaito Tanaka', sport: 'swimming', discipline: 'Swimming', country: 'JPN', img: '../imgs/ath2.jpg', bio: 'Silver medalist in 100m freestyle. Renowned for explosive starts.', medals: { gold: 0, silver: 1, bronze: 0 } },
    { id: 3, name: 'Sofia Petrov', sport: 'gymnastics', discipline: 'Gymnastics', country: 'RUS', img: '../imgs/ath3.jpg', bio: 'Bronze in all-around. Graceful, precise, resilient.', medals: { gold: 0, silver: 0, bronze: 1 } },
    { id: 4, name: 'Liam O\'Connor', sport: 'cycling', discipline: 'Cycling', country: 'IRL', img: '../imgs/ath4.jpg', bio: 'Track cycling champion known for sprinting power.', medals: { gold: 2, silver: 1, bronze: 0 } },
    { id: 5, name: 'Ayesha Khan', sport: 'archery', discipline: 'Archery', country: 'PAK', img: '../imgs/ath5.jpg', bio: 'Top-ranked archer with calm precision.', medals: { gold: 0, silver: 0, bronze: 2 } },
    { id: 6, name: 'Marco Silva', sport: 'rowing', discipline: 'Rowing', country: 'POR', img: '../imgs/ath6.jpeg', bio: 'Endurance specialist with great teamwork.', medals: { gold: 1, silver: 1, bronze: 0 } },
    { id: 7, name: 'Nina Müller', sport: 'boxing', discipline: 'Boxing', country: 'GER', img: '../imgs/ath7.webp', bio: 'Aggressive southpaw with tactical footwork.', medals: { gold: 0, silver: 2, bronze: 1 } },
    { id: 8, name: 'Chen Wei', sport: 'taekwondo', discipline: 'Taekwondo', country: 'CHN', img: '../imgs/ath8.jpg', bio: 'Lightning kicks and strong defense.', medals: { gold: 1, silver: 0, bronze: 0 } },
    { id: 9, name: 'Lucas Hernandez', sport: 'basketball', discipline: 'Basketball', country: 'FRA', img: '../imgs/ath9.jpg', bio: 'Playmaker and defensive anchor.', medals: { gold: 0, silver: 1, bronze: 0 } },
    { id: 10, name: 'Zara Ali', sport: 'swimming', discipline: 'Swimming', country: 'EGY', img: '../imgs/ath10.jpeg', bio: 'Emerging talent in distance freestyle.', medals: { gold: 0, silver: 0, bronze: 0 } },
    { id: 11, name: 'Jonas Berg', sport: 'skiing', discipline: 'Skiing', country: 'SWE', img: '../imgs/ath11.jpg', bio: 'Speed events specialist.', medals: { gold: 3, silver: 0, bronze: 1 } },
    { id: 12, name: 'Anita Gomez', sport: 'weightlifting', discipline: 'Weightlifting', country: 'ESP', img: '../imgs/ath12.webp', bio: 'Records in clean & jerk.', medals: { gold: 0, silver: 0, bronze: 1 } }
];

let shownCount = 8;
const increment = 4;

const grid = document.getElementById('athleteGrid');
const searchInput = document.getElementById('searchInput');
const sportFilter = document.getElementById('sportFilter');
const sortSelect = document.getElementById('sortSelect');
const resetBtn = document.getElementById('resetBtn');
const loadMoreBtn = document.getElementById('loadMore');

const modal = document.getElementById('profileModal');
const modalClose = document.getElementById('modalClose');
const modalMedia = document.getElementById('modalMedia');
const modalName = document.getElementById('modalName');
const modalSport = document.getElementById('modalSport');
const modalBio = document.getElementById('modalBio');
const modalMedals = document.getElementById('modalMedals');

function medalCount(a) {
    return (a.medals.gold || 0) + (a.medals.silver || 0) + (a.medals.bronze || 0);
}

function createCard(a) {
    const div = document.createElement('article');
    div.className = 'athlete-card';
    div.tabIndex = 0;
    div.setAttribute('data-id', a.id);

    div.innerHTML = `
<div class="athlete-thumb" aria-hidden="true">
  <img loading="lazy" src="${a.img}" alt="${a.name}">
</div>
<div class="athlete-body">
  <div>
    <div class="athlete-meta">
      <div>
        <div class="athlete-name">${a.name}</div>
        <div class="athlete-sport">${a.discipline} • ${a.country}</div>
      </div>
    </div>
    <div class="athlete-stats" aria-hidden="true">
      <div class="stat">🏅 ${medalCount(a)}</div>
      <div class="stat">G:${a.medals.gold || 0}</div>
      <div class="stat">S:${a.medals.silver || 0}</div>
      <div class="stat">B:${a.medals.bronze || 0}</div>
    </div>
  </div>

  <div class="card-actions">
    <button class="btn view-btn">View Profile</button>
  </div>
</div>
`;

    div.querySelector('.view-btn').addEventListener('click', () => openProfile(a));
    div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { openProfile(a); e.preventDefault(); }
    });

    return div;
}

function renderGrid(list) {
    grid.innerHTML = '';
    const toShow = list.slice(0, shownCount);
    if (toShow.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted)">No athletes match your search/filter.</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    toShow.forEach(a => grid.appendChild(createCard(a)));
    loadMoreBtn.style.display = (shownCount < list.length) ? 'inline-block' : 'none';
}

function getFilteredSorted() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const sport = sportFilter.value;
    const sort = sortSelect.value;

    let list = ATHLETES.slice();

    if (sport !== 'all') {
        list = list.filter(a => a.sport === sport);
    }

    if (q.length) {
        list = list.filter(a => (a.name + ' ' + a.discipline).toLowerCase().includes(q));
    }

    if (sort === 'name-asc') list.sort((x, y) => x.name.localeCompare(y.name));
    if (sort === 'name-desc') list.sort((x, y) => y.name.localeCompare(x.name));
    if (sort === 'medals-desc') list.sort((x, y) => medalCount(y) - medalCount(x));
    if (sort === 'medals-asc') list.sort((x, y) => medalCount(x) - medalCount(y));

    return list;
}

function updateAndRender(resetShown = false) {
    if (resetShown) shownCount = 8;
    const list = getFilteredSorted();
    renderGrid(list);
}

loadMoreBtn.addEventListener('click', () => {
    shownCount += increment;
    updateAndRender(false);
});

[searchInput, sportFilter, sortSelect].forEach(el => {
    el.addEventListener('input', () => updateAndRender(true));
    el.addEventListener('change', () => updateAndRender(true));
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    sportFilter.value = 'all';
    sortSelect.value = 'name-asc';
    updateAndRender(true);
});

function openProfile(a) {
    modalMedia.innerHTML = `<img src="${a.img}" alt="${a.name}">`;
    modalName.textContent = a.name;
    modalSport.textContent = a.discipline + ' • ' + a.country;
    modalBio.textContent = a.bio;
    modalMedals.innerHTML = `
<div class="stat">Gold: ${a.medals.gold || 0}</div>
<div class="stat">Silver: ${a.medals.silver || 0}</div>
<div class="stat">Bronze: ${a.medals.bronze || 0}</div>
`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
}

function closeProfile() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalMedia.innerHTML = '';
}

modalClose.addEventListener('click', closeProfile);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProfile();
});

document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') closeProfile();
});

updateAndRender(true);

document.addEventListener('error', function (e) {
    const t = e.target;
    if (t.tagName === 'IMG' && t.src && t.src.indexOf('data:') !== 0) {
        t.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" fill="#888" font-size="20" text-anchor="middle" alignment-baseline="middle">Image not found</text></svg>`
        );
    }
}, true);

let lastFocused;
document.querySelectorAll('.view-btn').forEach(b => {
    b.addEventListener('focus', () => lastFocused = document.activeElement);
});

modalClose.addEventListener('click', () => {
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
})