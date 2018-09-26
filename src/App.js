import React, { Component } from 'react';
import './App.css';
import GithubApi from './Github-api';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Github API v3 Demo</h1>
          <h3>Ben Fletcher</h3>
        </header>
        <p className="App-intro">
          The Github API allows for certain data retrieval without authentication.
        </p>
        <GithubApi />
      </div>
    );
  }
}

export default App;
