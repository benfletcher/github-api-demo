import React, { Component } from 'react';
import Commits from './Commits';
import './Github-api.css';

const ghVersionHeader = {
  headers: { "Accept": "application/vnd.github.v3+json" }
};

class GithubApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      user: "benfletcher", // default GH user to query
      name: "loading...",
      profileURL: null,
      avatarURL: null,
      commits: [],
    };
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/users/${this.state.user}`,
      ghVersionHeader
    )
      .then(res => res.json())
      .then(({
        avatar_url: avatarURL,
        name,
        html_url: profileURL,
      }) => this.setState({
        isLoaded: true,
        avatarURL,
        name,
        profileURL,
      }, this.fetchEvents) // delay next fetch until after UI update
      )
      .catch(console.error);
  }

  fetchEvents() {
    // called after setState from initial user fetch
    fetch(
      `https://api.github.com/users/${this.state.user}/events`,
      ghVersionHeader
    )
      .then(response => response.json())
      .then(response => {
        const commitDetails = [];

        response
          .filter(event => event.type === "PushEvent")
          .map(pushes => pushes.payload.commits)
          .forEach(commit =>
            commit.forEach(details => commitDetails.push(details))
          );

        this.setState({ commits: commitDetails });
      })
      .catch(console.error);
  }

  render() {
    const {
      isLoaded,
      avatarURL,
      name,
      user,
      profileURL,
      commits,
    } = this.state;

    return (
      <div>
        <h2>Name: {name}</h2>
        <p>GH Username: {user}</p>
        <a href={profileURL}>Github Profile</a>
        <div>
          {
            isLoaded
              ? <img id="avatar" src={avatarURL} alt="Github user avatar" />
              : "Loading..."
          }
        </div>
        <Commits>{commits}</Commits>
      </div>
    );
  }
}

export default GithubApi;
