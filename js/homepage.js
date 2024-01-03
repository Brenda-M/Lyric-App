const form = document.getElementById('form');
const search = document.getElementById('searchMusic');
const result = document.getElementById('result');
const more = document.getElementById('more');
const loader = document.getElementById('loader');
const error = document.getElementById('error');

const apiURL = 'https://api.lyrics.ovh';

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function searchSongs(term) {
  toggleLoader(true);
  fetch(`${apiURL}/suggest/${term}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => {
      displayError('Error fetching data:', err);
    })
    .finally(() => toggleLoader(false));
}

function showData(data) {
  const songsList = data.data
    .map(
      (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
    )
    .join('');

  result.innerHTML = `<ul class="songs">${songsList}</ul>`;
  more.innerHTML = data.prev || data.next
    ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>
       <button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
    : '';
}

function getMoreSongs(url) {
  toggleLoader(true);
  fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => {
      displayError('Error fetching more songs:', err);
    })
    .finally(() => toggleLoader(false));
}

function getLyrics(artist, songTitle) {
  toggleLoader(true);
  fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

      result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
                        <span>${lyrics}</span>`;
      more.innerHTML = '';
    })
    .catch(err => {
      displayError('Error fetching lyrics:', err);
    })
    .finally(() => toggleLoader(false));
}

function displayError(message, err) {
  error.innerHTML = `<p>${message}</p>`;

  // Clear error message after 3000 milliseconds (3 seconds)
  setTimeout(() => {
    error.innerHTML = '';
  }, 3000);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    displayError('Please enter a search term');
  } else {
    searchSongs(searchTerm);
    form.reset();
  }
});

result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
});
