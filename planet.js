// let string = "http://localhost:3000/planet.html?id=10";
// const sp = new URLSearchParams(window.location.search);
// const id = sp.get('id');

const baseUrl = `http://localhost:9001/api`;
let climate, surfaceWater, name, diameter, rotationPeriod, terrain, gravity, orbitalPeriod, population;

addEventListener('DOMContentLoaded', () => {
  // add more here
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getPlanet(id);
});

async function getPlanet(id) {
    try {
        planet = await fetchPlanet(id);
        characters = await fetchCharacters(id);
        films = await fetchFilms(id);
    } catch (ex) {
        console.error(`Error reading planet ${id} data`, ex.message);
    }
    renderPlanet(planet);
}

// fetch('http://localhost:9000/api/socks/1/10')
//   .then(response => response.json())
//   .then(data => console.log('Data:', data))
//   .catch(error => console.error('Error:', error))
//   .finally(() => console.log('Fetch attempt completed.'));

async function fetchPlanet(id) {
    let planetURL = `http://localhost:9001/api/planets/${id}`;
    const planet = await fetch(planetURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return planet;
}

async function fetchCharacters(id) {
    let charactersURL = `http://localhost:9001/api/planets/${id}/characters`;
    const characters = await fetch(charactersURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return characters;
}

async function fetchFilms(id) {
    let filmsURL = `http://localhost:9001/api/planets/${id}/films`;
    const films = await fetch(filmsURL)
        .then(data => console.log('Data:', data))
        .catch(error => console.error('Error:', error))
        .finally(() => console.log('Fetch attempt completed.'));
    return films;
}