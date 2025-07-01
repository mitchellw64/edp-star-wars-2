import { Link } from "react-router-dom";

const Characters = ({ characters }) => {
  if (!characters.length) return <p>Loading characters...</p>;

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
