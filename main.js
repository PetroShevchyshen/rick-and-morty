const SERVER_URLS = {
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
};

const characterWrapper = document.querySelector('.characters-collection-wrapper');
const locationWrapper = document.querySelector('.locations-collection-wrapper');
const episodeWrapper = document.querySelector('.episodes-collection-wrapper');

const characterPaginationWrapper = document.querySelector('.characters-collection-pagination');
const episodePaginationWrapper = document.querySelector('.episodes-collection-pagination');
const locationPaginationWrapper = document.querySelector('.locations-collection-pagination');

let characterCollection = [];
let locationCollection = [];
let episodeCollection = [];

const episodeTableTitles = ["Episode", "Name", "Date"];
const locationTableTitles = ["Name", "Type", "Dimension"];

function loadContent(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error("Something wrong with Load Content", error))
}

async function getCharacters(url) {
  return await loadContent(url)
    .then(data =>
      characterCollection.push(...data.results))
    .catch(e => console.error(e));
};

async function createCharacterCollection(url = SERVER_URLS.characters) {
  await getCharacters(url);
  await createPagination(SERVER_URLS.characters);

  if (characterCollection.length === 0)
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

async function getEpisodes(url) {
  return await loadContent(url)
    .then(data =>
      episodeCollection.push(...data.results))
    .catch(e => console.error(e));
};

async function createEpisodeCollection(url = SERVER_URLS.episodes) {
  await getEpisodes(url);
  await createPagination(SERVER_URLS.episodes);

  if (episodeCollection.length === 0)
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

async function getLocations(url) {
  return await loadContent(url)
    .then(data =>
      locationCollection.push(...data.results))
    .catch(e => console.error(e));
};

async function createLocationCollection(url = SERVER_URLS.locations) {
  await getLocations(url);
  await createPagination(SERVER_URLS.locations);

  if (locationCollection.length == 0)
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

async function createPagination(url) {
  const response = await loadContent(url);
  let paginationCount = response.info.pages;
  paginationCount = paginationCount < 20 ? paginationCount : 20;
  let paginationWrapper;

  switch (url) {
    case SERVER_URLS.characters:
      paginationWrapper = characterPaginationWrapper;
      break;
    case SERVER_URLS.locations:
      paginationWrapper = locationPaginationWrapper;
      break;
    case SERVER_URLS.episodes:
      paginationWrapper = episodePaginationWrapper;
      break;
    default:
      break;
  }
  paginationWrapper.classList.add('pagination')

  for (let index = 0; index < paginationCount; index++) {
    const paginationBtn = document.createElement('button');
    paginationBtn.innerText = index + 1;
    paginationWrapper.append(paginationBtn);
  }
}

async function getCharacterPage(event) {
  const btn = event.target.closest('button');
  if (!btn)
    return

  characterWrapper.innerHTML = '';
  characterPaginationWrapper.innerHTML = '';
  characterCollection = [];

  let postfix = `?page=${btn.innerText}`;

  await createCharacterCollection(SERVER_URLS.characters.concat(postfix));
}

async function getEpisodePage(event) {
  const btn = event.target.closest('button');
  if (!btn)
    return

  episodeWrapper.innerHTML = '';
  episodePaginationWrapper.innerHTML = '';
  episodeCollection = [];

  let postfix = `?page=${btn.innerText}`;

  await createEpisodeCollection(SERVER_URLS.episodes.concat(postfix));
}

async function getLocationPage(event) {
  const btn = event.target.closest('button');
  if (!btn)
    return

  locationWrapper.innerHTML = '';
  locationPaginationWrapper.innerHTML = '';
  locationCollection = [];

  let postfix = `?page=${btn.innerText}`;

  await createLocationCollection(SERVER_URLS.locations.concat(postfix));
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

window.addEventListener("load", () => {
  createCharacterCollection();
  createEpisodeCollection();
  createLocationCollection();
})

characterPaginationWrapper.addEventListener("click", getCharacterPage);
episodePaginationWrapper.addEventListener("click", getEpisodePage);
locationPaginationWrapper.addEventListener("click", getLocationPage);