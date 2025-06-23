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
  surfaceWaterSpan = document.querySelector('span#surfaceWater');
  gravitySpan = document.querySelector('span#gravity');
  diameterSpan = document.querySelector('span#diameter');
  orbitalPeriodSpan = document.querySelector('span#orbitalPeriod');
  rotationPeriodSpan = document.querySelector('span#rotationPeriod');

  // going to add characters/films to <ul> list
  charactersUl = document.querySelector('ul#characterList');
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
    let planet, characters, films;
    try {
        planet = await fetchPlanet(id); // example: planet.name reads Tatooine
        characters = await fetchCharacters(id);
        films = await fetchFilms(id);

        renderPlanet(planet, characters, films);
    } catch (ex) {
        console.error(`Error reading planet ${id} data`, ex.message);
    }
}

// fetches planet attributes
async function fetchPlanet(id) {
    let planetURL = `http://localhost:9001/api/planets/${id}`;
    console.log("planet url: ", planetURL);
    try {
        const planet = await fetch(planetURL);
        const data = await planet.json();
        console.log('Planet Data:', data)
        return data;
    } catch (ex) {
        console.error('Planet Error:', ex.message)
    }
    return [];
}

// fetches characters who were on planet
async function fetchCharacters(id) {
    let charactersURL = `http://localhost:9001/api/planets/${id}/characters`;
    try {
        const characters = await fetch(charactersURL);
        const data = await characters.json();
        console.log('Characters Data:', data)
        return data;
    } catch (ex) {
        console.error('Characters Error:', ex.message)
    }
    return [];
}

// fetches films featuring the planet
async function fetchFilms(id) {
    let filmsURL = `http://localhost:9001/api/planets/${id}/films`;
    try {
        const films = await fetch(filmsURL);
        const data = await films.json();
        console.log('Films Data:', data)
        return data;
    } catch (ex) {
        console.error('Films Error:', ex.message)
    }
    return [];
}

const renderPlanet = (planet, characters, films) => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name 
    
    // fills in text content of each tag with planet attribute from the data
    nameH1.textContent = planet?.name;
    populationSpan.textContent = planet?.population;
    climateSpan.textContent = planet?.climate;
    terrainSpan.textContent = planet?.terrain;
    surfaceWaterSpan.textContent = planet?.surface_water;
    gravitySpan.textContent = planet?.gravity;
    diameterSpan.textContent = planet?.diameter;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    rotationPeriodSpan.textContent = planet?.rotation_period;

    // puts all characters into a list
    const charactersLis = characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
    charactersUl.innerHTML = charactersLis.join("");

    const filmsLis = films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`);
    filmsUl.innerHTML = filmsLis.join("");
}   