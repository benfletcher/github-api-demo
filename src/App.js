import React from 'react';
import './App.css';
import GithubApi from './UserProfile/Github-api';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Github API v3 Demo</h1>
      <p className="App-intro">
        Summary of Github user profile and recent activity.
      </p>
    </header>
    <GithubApi />
  </div>
);

export default App;
