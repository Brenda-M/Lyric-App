//we making  two requests to the api. 1. get a list of songs when we type search button
//2. when we press get lyrics button it makes another request to the api with the song and artist name

const form = document.getElementById('form');
const search = document.getElementById('searchMusic');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//search by song or artist
async function searchSongs(term){
	const res = await fetch(`${apiURL}/suggest/${term}`);
	const data = await res.json();

	showData(data);
}

//diplay search results in the DOM



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


