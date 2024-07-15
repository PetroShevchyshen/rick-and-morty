const CHARACTER_URL = "https://rickandmortyapi.com/api/character/";
const characterWrapper = document.querySelector('.collection-wrapper');
const characterCollection = [];

function loadContent(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error("Something wrong with Load Content", error))
}

async function getCharacters() {
  return await loadContent(CHARACTER_URL)
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
    divItem.style.setProperty("background-image", `url(${item.image})`)

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
    divItem.append(wrapper);
    characterWrapper.append(divItem);

    divItem.addEventListener("mouseover", () => {
      wrapper.style.display = 'flex';
    })

    divItem.addEventListener("mouseleave", () => {
      wrapper.style.display = 'none';
    })
  }
}

//window.addEventListener("load", getCharacters);
window.addEventListener("load", createCharacterCollection);