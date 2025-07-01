import React, { useState, useEffect } from "react";
import Characters from './Characters';

const App = () => {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/characters');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacterData(json_response);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <Characters characters={characterData} />
    </div>
  );
};

export default App;
