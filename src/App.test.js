import React from 'react';
import ReactDOM from 'react-dom';
import Commits from "./Commits";
import EventSummary from './EventSummary';

it('Commits table renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Commits commits={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Events table renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventSummary eventCounts={{
    push: 0,
    pullRequest: 0,
    watch: 0,
    create: 0,
    publicEvt: 0,
  }} />, div);
  ReactDOM.unmountComponentAtNode(div);
})
