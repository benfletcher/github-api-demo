import React, { Component } from 'react';

class GithubApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "benfletcher",
      name: "Ben Fletcher",
      isLoaded: false,
      userAvatar: null,
    };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.user}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({
          isLoaded: true,
          userAvatar: result.avatar_url,
        })
      })
      .catch(console.error);
  }

  render() {
    const { isLoaded, userAvatar, name } = this.state;

    return (
      <div>
        <h2>{name}'s last commit:</h2>
        <div>
          Github API response received? <strong>{isLoaded ? "Yep!" : "Not yet!"}</strong>
        </div>
        <img id="ghAvatar" src={userAvatar} alt="Github user avatar" />
      </div>
    );
  }
}

export default GithubApi;