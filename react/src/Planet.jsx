import { Link } from "react-router-dom";

const Planet = ({ planet }) => {
  if (!planet.length) return <p>Loading planet...</p>;

  return (
    <div>
      <h2>Characters</h2>
      <div className="character-grid">
        {characters.map((char) => (
          <Link
            to={`/characters/${char.id}`}
            key={char.id}
            className="character-button"
          >
            {char.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Characters;