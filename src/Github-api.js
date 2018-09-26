import React, { Component } from 'react';

const ghVersionHeader = {
  headers: { "Accept": "application/vnd.github.v3+json" }
};

class GithubApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "benfletcher", // default GH user to query
      name: "loading...",
      isLoaded: false,
      avatar_url: null,
    };
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/users/${this.state.user}`,
      ghVersionHeader
    )
      .then(res => res.json())
      .then(({
        avatar_url,
        name,
        url,
      }) => this.setState({
        isLoaded: true,
        avatar_url,
        name,
        url,
      }, this.fetchEvents)
      )
      .catch(console.error);
  }

  fetchEvents() {
    // fetch these only after initial user info response
    // this is a callback to the async setState following that request
    console.log("retrieve commits here...", this.state)
    fetch(
      `https://api.github.com/users/${this.state.user}/events`,
      ghVersionHeader
    )
      .then(res => res.json())
      .then(res => res.filter(event => event.type === "PushEvent"))
      .then(console.log)
  }

  render() {
    const { isLoaded, avatar_url, name } = this.state;

    return (
      <div>
        <h2>Name: {name}</h2>
        <div id="avatar">
          {
            isLoaded
              ? <img id="ghAvatar" src={avatar_url} alt="Github user avatar" />
              : "Loading..."
          }
        </div>
      </div>
    );
  }
}

export default GithubApi;
