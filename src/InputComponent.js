import React, { useState } from 'react';
import axios from 'axios';

function InputComponent() {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.get(input);
      console.log(response.data);
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
