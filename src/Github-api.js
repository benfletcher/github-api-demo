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
        avatar_url,
        name,
        url,
      }) => this.setState({
        isLoaded: true,
        avatar_url,
        name,
        url,
      }, this.fetchEvents) // triggers immediate UI update followed by next fetch
      )
      .catch(console.error);
  }

  fetchEvents() {
    // fetch these only after initial user info response
    // this is a callback to the async setState following that request
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
            commit.forEach(commit => commitDetails.push(commit))
          );

        this.setState({ commits: commitDetails }, () => console.log(this.state));
      })
      .catch(console.error);
  }

  render() {
    const { isLoaded, avatar_url, name } = this.state;

    return (
      <div>
        <h2>Name: {name}</h2>
        <div id="avatar">
          {
            isLoaded
              ? <img id="avatar" src={avatar_url} alt="Github user avatar" />
              : "Loading..."
          }
        </div>
        <table>
          <thead>
            <tr>
              <th>SHA</th>
              <th>message</th>
              <th>URL</th>
            </tr>
          </thead>

          {

          }
        </table>
      </div>
    );
  }
}

export default GithubApi;
