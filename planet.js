// let string = "http://localhost:3000/planet.html?id=10";
// const sp = new URLSearchParams(window.location.search);
// const id = sp.get('id');

const baseUrl = `http://localhost:9001/api`;

// planet attributes, found from messing with api calls in postman
let climate, surfaceWater, name, diameter, rotationPeriod, terrain, gravity, orbitalPeriod, population;

// runs on page load
addEventListener('DOMContentLoaded', () => {
  // finds id in html 
  nameH1 = document.querySelector('h1#name');
  populationSpan = document.querySelector('span#population');
  climateSpan = document.querySelector('span#climate');
  terrainSpan = document.querySelector('span#terrain');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  gravitySpan = document.querySelector('span#gravity');
  diameterSpan = document.querySelector('span#diameter');
  orbitalPeriodSpan = document.querySelector('span#orbital_period');
  rotationPeriodSpan = document.querySelector('span#rotation_period');

  // going to add characters/films to <ul> list
  charactersUl = document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');
  
  // get id from baseURL
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');

  // collect data
  getPlanet(id);
});

// collects data from all 3 apis (planet, characters on planet, films on planet)
// renders (adds data to html) of planet after
async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id); // example: planet.name reads Tatooine
        planet.characters = await fetchCharacters(id);
        planet.films = await fetchFilms(id);
    } catch (ex) {
        console.error(`Error reading planet ${id} data`, ex.message);
    }

    // renders (adds data to html) of planet
    renderPlanet(planet);
}

// Sample fetch call
// fetch('http://localhost:9000/api/socks/1/10')
//   .then(response => response.json())
//   .then(data => console.log('Data:', data))
//   .catch(error => console.error('Error:', error))
//   .finally(() => console.log('Fetch attempt completed.'));

// fetches planet attributes
async function fetchPlanet(id) {
    let planetURL = `http://localhost:9001/api/planets/${id}`;
    const planet = await fetch(planetURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return planet;
}

// fetches characters who were on planet
async function fetchCharacters(id) {
    let charactersURL = `http://localhost:9001/api/planets/${id}/characters`;
    const characters = await fetch(charactersURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return characters;
}

// fetches films featuring the planet
async function fetchFilms(id) {
    let filmsURL = `http://localhost:9001/api/planets/${id}/films`;
    const films = await fetch(filmsURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return films;
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name 
    
    // fills in text content of each tag with planet attribute from the data
    nameH1.textcontent = planet?.name;
    populationSpan.textcontent = planet?.population;
    climateSpan.textcontent = planet?.climate;
    terrainSpan.textcontent = planet?.terrain;
    surfaceWaterSpan.textcontent = planet?.surfaceWater;
    gravitySpan.textcontent = planet?.gravity;
    diameterSpan.textcontent = planet?.diameter;
    orbitalPeriodSpan.textcontent = planet?.orbitalPeriod;
    rotationPeriodSpan.textcontent = planet?.rotationPeriod;

    // puts all characters into a list
    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}"></li>`);
    charactersUl.innerHTML = charactersLis.join("");

    // film.title and this whole URL could have Joseph conflicts later on
    const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`);
    filmsUl.innerHTML = filmsLis.join("");
}   