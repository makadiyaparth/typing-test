import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/word?number=10"
      );
      setWord(response.data[0]);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    checkWord();
  };
  
  
  const getInputStyle = () => {
    if (result === 'Incorrect!') {
      return { borderColor: 'red' };
    }
    return { borderColor: 'green' };
  };

  const checkWord = () => {
    if (input === word) {
      setResult("Correct!");
      fetchWord();
      setInput("");
    } else if (word.startsWith(input)) {
      setResult("");
    } else {
      setResult("Incorrect!");
    }
  };

  return (
    <div className="App">
      <h1>Typing Test Game</h1>
      <p>{word}</p>
      <input type="text" value={input} onChange={handleInputChange} style={getInputStyle()} autoFocus />
    </div>
  );
}

export default App;
