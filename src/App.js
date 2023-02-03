import React, { useState, useEffect } from 'react';
import './App.css';
import NeuralNetworkVisualization from './components/NeuralNetworkVisualization';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <NeuralNetworkVisualization />
    </div>
  );
}

export default App;
