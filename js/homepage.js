//we making  two requests to the api. 1. get a list of songs when we type search button
//2. when we press get lyrics button it makes another request to the api with the song and artist name

const form = document.getElementById('form');
const search = document.getElementById('searchMusic');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//Event Listeners
form.addEventListener('submit', e => {
	e.preventDefault();

	const searchTerm = search.value.trim();

//validation to ensure user typed something in search box

if(!searchTerm){
	alert("Please enter a search term");
} else {
	searchSongs(searchTerm);
}

});

// async function searchSongs(term) {
// 	const response = await fetch(`${apiURL}/suggest/${term}`;)
// 	const data = await response.json();

// 	showData(data);
// }

// function showData(data){
// 	result.innerHTML = `<ul class="songs>
// 	${data.data
// 		.map(
// 			song => `<li>
// 			<span><strong>${song.artist.name}</strong> - ${song.title}</span>
// 			<button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
// 			</li>`
// 		)
// 		.join('')}
// 	</ul>`;

	
// }
