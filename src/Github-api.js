import React, { Component } from 'react';
import Commits from './Commits';
import './Github-api.css';

class GithubApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isError: false,
      user: "benfletcher", // default GH user to query
      name: "loading...",
      profileURL: null,
      avatarURL: null,
      commits: [],
    };

    this.ghVersionHeader = {
      headers: { "Accept": "application/vnd.github.v3+json" },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  // called on mount & username change
  fetchUser() {
    fetch(
      `https://api.github.com/users/${this.state.user}`,
      this.ghVersionHeader
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response;
      })
      .then(res => res.json())
      .then(({
        avatar_url: avatarURL,
        name,
        html_url: profileURL,
      }) => this.setState({
        isLoaded: true,
        isError: false,
        avatarURL,
        name,
        profileURL,
      }, this.fetchEvents) // delay next fetch until after UI update
      )
      .catch(err => {
        this.setState({ isError: true });
      });
  }

  fetchEvents() {
    // called after setState from initial user fetch
    fetch(
      `https://api.github.com/users/${this.state.user}/events`,
      this.ghVersionHeader
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        const commitDetails = [];

        // Normalize data: unpack commits from pushes -- each push can have >1 commit
        response
          .filter(event => event.type === "PushEvent")
          .map(pushes => pushes.payload.commits)
          .forEach(commit =>
            commit.forEach(details => commitDetails.push(details))
          );

        this.setState({ commits: commitDetails });
      })
      .catch(err => {
        this.setState({ isError: true });
      });
  }

  handleChange(e) {
    this.setState({ user: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchUser();
  }

  render() {
    const {
      isLoaded,
      isError,
      avatarURL,
      name,
      user,
      profileURL,
      commits,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Github Username</legend>
            <input
              value={user}
              onChange={this.handleChange} />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </fieldset>
        </form>
        {
          isError
            ? <h1>Sorry that username wasn't found on Github. Please try a different username.</h1>
            : <div>
              <h2>Name: {name}</h2>
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
        }

      </div>
    );
  }
}

export default GithubApi;
