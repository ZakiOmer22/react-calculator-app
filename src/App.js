import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

const buttons = [
  'C', 'DEL', '%', '/',
  '9', '8', '7', '*',
  '6', '5', '4', '-',
  '3', '2', '1', '+',
  '0', '.', 'ANS', '='
];

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (text) => {
    if (text === 'C') {
      setInput('');
      setResult('');
    } else if (text === 'DEL') {
      setInput((prev) => prev.slice(0, -1));
    } else if (text === '=') {
      try {
        const expression = input.replace(/%/g, '/100');
        const evalResult = evaluate(expression);
        setResult(`= ${evalResult}`);
      } catch {
        setResult('Error');
      }
    } else if (text === 'ANS') {
      if (result.startsWith('=')) {
        setInput(result.slice(2)); // remove '= '
      }
    } else {
      setInput((prev) => prev + text);
    }
  };

  const isOperator = (char) => ['/', '*', '-', '+', '=', '%'].includes(char);

  return (
    <div className="app">
      <div className="header">ZACKI ABDULKADIR OMER</div>
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="grid">
        {buttons.map((btn, i) => (
          <button
            key={i}
            className={`btn ${isOperator(btn) ? 'operator' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
