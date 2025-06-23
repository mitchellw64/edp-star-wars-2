const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

const fetchFilm = async() => {
    let released = document.getElementById('year');
    let director = document.getElementById('director');
    let episode = document.getElementById('episode');

    try {
    let film = await fetch(`http://localhost:9001/api/films/${id}`).then(res => res.json());
    let name = document.getElementById('film-name');
    name.textContent = film.title; 
    released.textContent = film.release_date;
    director.textContent = film.director;
    episode.textContent = film.episode_id;

    } catch (err) {
        console.log('error:', err);
    }
};

const fetchCharacters = async() => {
    try {
        let characters = await fetch(`http://localhost:9001/api/films/${id}/characters`).then(res => res.json());
        characters.map(person => {
            let listItem = document.createElement('a');
            listItem.textContent = person.name;
            document.getElementById('characterslist').appendChild(listItem)
            listItem.addEventListener('click', () =>{
                window.location = `/character.html?id=${person.id}`
            })
        })
    } catch (err) {
        console.log("Error:", err);
    }
}

const fetchPlanets = async() => {
    try {
        let planets = await fetch(`http://localhost:9001/api/films/${id}/planets`).then(res => res.json());
        planets.map(planet => {
            let listItem = document.createElement('a');
            listItem.textContent = planet.name;
            document.getElementById('planets-list').appendChild(listItem)
            listItem.addEventListener('click', () => {
                window.location = `/planet.html?id=${planet.id}`
            })
        })
    } catch (err) {
        console.log("Error:", err)
    }
}

fetchFilm()
fetchCharacters()
fetchPlanets()