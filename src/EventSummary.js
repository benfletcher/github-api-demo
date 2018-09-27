import React from 'react';

function EventSummary({ eventCounts }) {
  const {
    push,
    pullRequest,
    watch,
    create,
    publicEvt,
  } = eventCounts;

  return (
    <table className="countsTable">
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Push</td>
          <td>{push}</td>
        </tr>
        <tr>
          <td>Pull Request</td>
          <td>{pullRequest}</td>
        </tr>
        <tr>
          <td>watch</td>
          <td>{watch}</td>
        </tr>
        <tr>
          <td>create</td>
          <td>{create}</td>
        </tr>
        <tr>
          <td>Public</td>
          <td>{publicEvt}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EventSummary;
