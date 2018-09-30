import React, { Component } from 'react';
import Profile from '../Profile';
import EventParsing from './EventParsing';
import './Github-api.css';

class GithubApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      user: 'benfletcher', // default GH user to query
      eventResponse: null,
      userResponse: null,
    };

    this.ghVersionHeader = {
      headers: { Accept: 'application/vnd.github.v3+json' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  // called on mount & username change
  fetchUser() {
    const { user } = this.state;
    fetch(
      `https://api.github.com/users/${user}`,
      this.ghVersionHeader,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(response => this.setState({
        isError: false,
        userResponse: response,
      }, this.fetchEvents)) // delay next fetch until after UI update)
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  fetchEvents() {
    const { user } = this.state;
    fetch(
      `https://api.github.com/users/${user}/events`,
      this.ghVersionHeader,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(response => this.setState({ eventResponse: response }))
      .catch(() => this.setState({ isError: true }));
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
      isError,
      user,
      userResponse,
      eventResponse,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Github Username</legend>
            <input
              value={user}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </fieldset>
        </form>
        {
          isError
            ? <h1>Sorry that username was not found on Github. Please try a different username.</h1>
            : (
              <div>
                <Profile userResponse={userResponse} />
                <EventParsing eventResponse={eventResponse} />
              </div>
            )
        }
      </div>
    );
  }
}

export default GithubApi;
