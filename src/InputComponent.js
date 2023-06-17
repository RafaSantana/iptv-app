import React, { useState } from 'react';
import axios from 'axios';
import { M3U } from 'playlist-parser'; // Importando o parser M3U

function InputComponent() {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.get(input);
      const playlist = M3U.parse(response.data); // Analisando a resposta como um arquivo M3U
      console.log(playlist); // Imprimindo a playlist no console
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default InputComponent;
