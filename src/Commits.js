import React from 'react';
import './Commits.css';
import ghLogo from './GitHub-Mark-32px.png';

const Commits = ({ children: commits }) => {
  const firstThreeCommits = commits.slice(0, 3);

  return (
    <div id="commits">
      <table>
        <thead>
          <tr>
            <th>SHA</th>
            <th>Message</th>
            <th>Commit details</th>
          </tr>
        </thead>
        <tbody>
          {
            firstThreeCommits.map(({ sha, message, url }) => (
              <tr key={sha}>
                <td>{sha}</td>
                <td className="message">{message}</td>
                <td className="ghLink"><a href={url}>
                  <img src={ghLogo} alt="Github logo" />
                </a></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Commits;
