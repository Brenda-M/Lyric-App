const form = document.getElementById('form');
const search = document.getElementById('searchMusic');
const result = document.getElementById('result');
const more = document.getElementById('more');
const loader = document.getElementById('loader');

const apiURL = 'https://api.lyrics.ovh';

function toggleLoader(show) {
	loader.style.display = show ? 'block' : 'none';
}

function searchSongs(term) {
	toggleLoader(true);
	fetch(`${apiURL}/suggest/${term}`)
		.then(res => res.json())
		.then(data => showData(data))
		.catch(error => console.error('Error fetching data:', error))
		.finally(() => toggleLoader(false)); // Hide loader after success or error
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
		.catch(error => console.error('Error fetching more songs:', error))
		.finally(() => toggleLoader(false)); // Hide loader after success or error
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
		.catch(error => console.error('Error fetching lyrics:', error))
		.finally(() => toggleLoader(false)); // Hide loader after success or error
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchTerm = search.value.trim();

	if (!searchTerm) {
		alert('Please enter a search term');
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


