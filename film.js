const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
console.log(id)

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
        console.log(characters)
        characters.map(person => {
            let listItem = document.createElement('li');
            listItem.textContent = person.name;
            document.getElementById('characters-list').appendChild(listItem)
        })
    } catch (err) {
        console.log("Error:", err);
    }
}

fetchFilm()
fetchCharacters()