import React, { useState, useEffect } from "react";

const App = () => {

  const [characterData, setCharacterData] = useState();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/characters');
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            console.log(json_response);
            setCharacterData(json_response); // assign JSON response to the data variable.
        } catch (error) {
            console.error('Error fetching socks:', error);
        }
    };

    fetchData();
  }, []);

    return (
        <div>
            <h1>This is the Sock component!</h1>
            {/* {
              // Change from static sock_data to data coming from sock API
              characterData.map((sock) => (
                  <Sock key={sock._id} data={sock} /> // Change id to _id. _id is the key in the API response
              ))
            } */}
        </div>
    );
};

export default App;