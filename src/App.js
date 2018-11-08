import React, { Component } from 'react';
import './App.css';
import GameState from './gameState/containers/GameState';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Clash Royale Helper
          </p>
        </header>
        <div className="GameState-container">
          <GameState />
        </div>
      </div>
    );
  }
}

export default App;
