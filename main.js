const SERVER_URL = "https://rickandmortyapi.com/api/character/";


function getCharacters() {
  return fetch(SERVER_URL)
    .then(response => response.json());
}
getCharacters().then(data => console.log(data))