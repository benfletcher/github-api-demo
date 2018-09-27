import React from 'react';
import Commits from './Commits';
import EventSummary from './EventSummary';

function EventsParsing({ eventResponse }) {
  if (!eventResponse) {
    return null;
  }

  const commits = [];

  const eventCounts = eventResponse.reduce((counts, event) => {
    counts.push += event.type === "PushEvent" ? 1 : 0;
    counts.pullRequest += event.type === "PullRequestEvent" ? 1 : 0;
    counts.watch += event.type === "WatchEvent" ? 1 : 0;
    counts.create += event.type === "CreateEvent" ? 1 : 0;
    counts.publicEvt += event.type === "PublicEvent" ? 1 : 0;

    // Normalize data: unpack commits from pushes -- each push can have >1 commit
    if (event.type === "PushEvent") {
      event.payload.commits.forEach(({ message, sha, url }) =>
        commits.push({ message, sha, url })
      );
    }

    return counts;
  }, {
      push: 0,
      pullRequest: 0,
      watch: 0,
      create: 0,
      publicEvt: 0,
    });

  return (
    <div>
      <Commits commits={commits}></Commits>
      <EventSummary eventCounts={eventCounts}></EventSummary>
    </div>
  );
}

export default EventsParsing;
