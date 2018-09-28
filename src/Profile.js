import React from 'react';

const Profile = ({ userResponse }) => {
  if (!userResponse) {
    return null;
  }

  const {
    name,
    html_url: profileURL,
    avatar_url: avatarURL,
  } = userResponse;

  return (
    <div>
      <h2>
        Name:
        {' '}
        {name}
      </h2>
      <a href={profileURL}>Link to Github Profile</a>
      <div>
        <img id="avatar" src={avatarURL} alt="Github user avatar" />
      </div>
    </div>
  );
};

export default Profile;
