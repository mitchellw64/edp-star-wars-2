import { useEffect, useState } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import Characters from "./Character";

const CharacterInline = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const charRes = await fetch(`http://localhost:3000/api/characters/${id}`);
      const charData = await charRes.json();
      setCharacter(charData[0]);

      const planetRes = await fetch(`http://localhost:3000/api/characters/${id}/planet`);
      const planetData = await planetRes.json();
      setHomeworld(planetData[0]);

      const filmLinksRes = await fetch(`http://localhost:3000/api/characters/${id}/films`);
      const filmRefs = await filmLinksRes.json();
      const filmData = await Promise.all(
        filmRefs.map(async (f) => {
          const res = await fetch(`http://localhost:3000/api/films/${f.film_id}`);
          const data = await res.json();
          return data[0];
        })
      );
      setFilms(filmData);
    };

    fetchData();
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Birth Year: {character.birth_year}</p>
      <p>Height: {character.height} cm</p>
      <p>Mass: {character.mass} kg</p>

      {homeworld && (
        <>
          <h3>Homeworld:</h3>
          <Link to={`/planets/${homeworld.id}`}>{homeworld.name}</Link>
        </>
      )}

      <h3>Films:</h3>
      <ul>
        {films.map((f) => (
          <li key={f.id}>
            <Link to={`/films/${f.id}`}>{f.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/characters")
      .then((res) => res.json())
      .then(setCharacterData);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Characters characters={characterData} />} />
      <Route path="/characters/:id" element={<CharacterInline />} />
    </Routes>
  );
};

export default App;
