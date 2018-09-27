import React from 'react';
import Commits from './Commits';
import EventSummary from './Event-Summary';

function EventsParsing({ eventResponse }) {
  if (!eventResponse) {
    return null;
  }

  return (
    <div>
      <Commits eventResponse={eventResponse}></Commits>
      <EventSummary eventResponse={eventResponse}></EventSummary>
    </div>
  );
}

export default EventsParsing;


// eventCounts: {
//   push: 0,
//   pullRequest: 0,
//   watch: 0,
//   create: 0,
//   public: 0,
// },