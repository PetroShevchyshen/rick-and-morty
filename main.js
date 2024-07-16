const SERVER_URLS = {
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
};

const characterWrapper = document.querySelector('.characters-collection-wrapper');
const locationWrapper = document.querySelector('.locations-collection-wrapper');
const episodeWrapper = document.querySelector('.episodes-collection-wrapper');

const characterCollection = [];
const locationCollection = [];
const episodeCollection = [];

const episodeTableTitles = ["Episode", "Name", "Date"];
const locationTableTitles = ["Name", "Type", "Dimension"];

function loadContent(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error("Something wrong with Load Content", error))
}

async function getCharacters() {
  return await loadContent(SERVER_URLS.characters)
    .then(data =>
      data.results.forEach(element => {
        characterCollection.push(element);
      }))
    .catch(e => console.error(e));
};

async function createCharacterCollection() {
  await getCharacters();

  if (!characterCollection.every)
    return

  for (let item of characterCollection) {
    const divItem = document.createElement('div');
    divItem.className = 'collection-item';
    const img = document.createElement('img');
    img.src = item.image;

    const itemTitle = document.createElement('p');
    itemTitle.className = 'item-title';
    itemTitle.classList.add('title')
    itemTitle.innerText = item.name;

    const wrapper = document.createElement('div');
    wrapper.className = 'item-information'

    const itemGender = document.createElement('p');
    itemGender.innerText = `Gender: ${item.gender}`;
    const itemSpecies = document.createElement('p');
    itemSpecies.innerText = `Species: ${item.species}`;
    const itemStatus = document.createElement('p');
    itemStatus.innerText = `Status: ${item.status}`;
    const itemLocation = document.createElement('p');
    itemLocation.innerText = `Location: ${item.location.name}`;

    wrapper.append(itemTitle, itemGender, itemSpecies, itemStatus, itemLocation);
    divItem.append(img, wrapper);
    characterWrapper.append(divItem);

    divItem.addEventListener("mouseover", () => {
      wrapper.style.display = 'flex';
      img.style.opacity = '0.4';
    })

    divItem.addEventListener("mouseleave", () => {
      wrapper.style.display = 'none';
      img.style.opacity = '1';
    })
  }
}

async function getEpisodes() {
  return await loadContent(SERVER_URLS.episodes)
    .then(data =>
      data.results.forEach(element => {
        episodeCollection.push(element);
      }))
    .catch(e => console.error(e));
};

async function createEpisodeCollection() {
  await getEpisodes();

  if (!episodeCollection.every)
    return

  const tableWrapper = document.createElement('table');
  tableWrapper.className = 'table-wrapper';

  const rowWithHeader = createTableHeader(episodeTableTitles);

  tableWrapper.append(rowWithHeader);

  for (const episode of episodeCollection) {
    const tableRow = document.createElement('tr');
    const episodeTitle = document.createElement('th');
    const episodeName = document.createElement('th');
    const episodeDate = document.createElement('th');

    episodeTitle.innerText = episode.episode;
    episodeName.innerText = episode.name;
    episodeDate.innerText = episode.air_date;

    tableRow.append(episodeTitle, episodeName, episodeDate);
    tableWrapper.append(tableRow);
  }

  episodeWrapper.append(tableWrapper);
}

function createTableHeader(tableTitles) {
  const tableRow = document.createElement('tr');
  for (const title of tableTitles) {
    const tableHead = document.createElement('th');
    tableHead.className = 'table-head';
    tableHead.innerText = title;
    tableRow.append(tableHead);
  }
  return tableRow;
}

async function getLocations() {
  return await loadContent(SERVER_URLS.locations)
    .then(data =>
      data.results.forEach(element => {
        locationCollection.push(element);
      }))
    .catch(e => console.error(e));
};

async function createLocationCollection() {
  await getLocations();

  if (!locationCollection.every)
    return

  const tableWrapper = document.createElement('table');
  tableWrapper.className = 'table-wrapper';

  const rowWithHeader = createTableHeader(locationTableTitles);

  tableWrapper.append(rowWithHeader);

  for (const episode of locationCollection) {
    const tableRow = document.createElement('tr');
    const episodeTitle = document.createElement('th');
    const episodeName = document.createElement('th');
    const episodeDate = document.createElement('th');

    episodeTitle.innerText = episode.name;
    episodeName.innerText = episode.type;
    episodeDate.innerText = episode.dimension;

    tableRow.append(episodeTitle, episodeName, episodeDate);
    tableWrapper.append(tableRow);
  }
  locationWrapper.append(tableWrapper);
}

window.addEventListener("load", createCharacterCollection);
window.addEventListener("load", createEpisodeCollection);
window.addEventListener("load", createLocationCollection);