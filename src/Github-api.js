import React, { Component } from 'react';

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
    fetch(`https://api.github.com/users/${this.state.user}`)
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
      }, this.retrieveCommits)
      )
      .catch(console.error);
  }

  retrieveCommits() {
    // fetch these only after initial user info response
    // this is a callback to the async setState following that request
    console.log("retrieve commits here...", this.state)
  }

  render() {
    const { isLoaded, avatar_url, name } = this.state;

    return (
      <div>
        <h2>Name: {name}</h2>
        <div>
          Github API response received? <strong>{isLoaded ? "Yep!" : "Not yet!"}</strong>
        </div>
        <img id="ghAvatar" src={avatar_url} alt="Github user avatar" />
      </div>
    );
  }
}

export default GithubApi;