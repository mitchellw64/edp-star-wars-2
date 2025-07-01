import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filmRes = await fetch(`http://localhost:3000/api/films/${id}`);
      const filmData = await filmRes.json();
      setFilm(filmData[0]);

      const charRes = await fetch(`http://localhost:3000/api/films/${id}/characters`);
      const charLinks = await charRes.json();
      const chars = await Promise.all(
        charLinks.map(async (c) => {
          const res = await fetch(`http://localhost:3000/api/characters/${id}`);
          const data = await res.json();
          return data[0];
        })
      );
      setCharacters(chars);

      const planetRes = await fetch(`http://localhost:3000/api/films/${id}/planets`);
      const planetLinks = await planetRes.json();
      const pls = await Promise.all(
        planetLinks.map(async (p) => {
          const res = await fetch(`http://localhost:3000/api/planets/${p.planet_id}`);
          const data = await res.json();
          return data[0];
        })
      );
      setPlanets(pls);
    };

    fetchData();
  }, [id]);

  if (!film) return <p>Loading...</p>;

  return (
    <div>
      <h1>{film.title}</h1>
      <p>Episode: {film.episode_id}</p>
      <p>Director: {film.director}</p>
      <p>Released: {film.release_date}</p>
      <p>{film.opening_crawl}</p>

      <h3>Characters</h3>
      <ul>
        {characters.map((c) => (
          <li key={c.id}><Link to={`/characters/${c.id}`}>{c.name}</Link></li>
        ))}
      </ul>

      <h3>Planets</h3>
      <ul>
        {planets.map((p) => (
          <li key={p.id}><Link to={`/planets/${p.id}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default FilmDetails;
