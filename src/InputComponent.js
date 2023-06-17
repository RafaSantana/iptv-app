import React, { useState } from 'react';
import axios from 'axios';
import { M3U } from 'playlist-parser';

function InputComponent() {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async () => {
    console.log('handleSubmit chamado');
    setLoading(true);
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const playlist = M3U.parse(event.target.result);
        console.log(playlist);
      };
      reader.readAsText(file);
    } else if (input) {
      try {
        const response = await axios.get(input);
        const playlist = M3U.parse(response.data);
        console.log(playlist);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '0 auto' }}>
      <input type="text" value={input} onChange={handleInputChange} placeholder="Insira a URL aqui" style={{ margin: '10px 0', padding: '10px', fontSize: '1rem' }}/>
      <input type="file" onChange={handleFileChange} style={{ margin: '10px 0', padding: '10px', fontSize: '1rem' }}/>
      <button onClick={handleSubmit} style={{ margin: '10px 0', padding: '10px', fontSize: '1rem', background: 'lightblue', border: 'none', borderRadius: '5px' }}>Submit</button>
      {loading && <p>Carregando...</p>}
    </div>
  );
}

export default InputComponent;
