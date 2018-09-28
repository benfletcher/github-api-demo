## Github APIv3 Demo App

[Github API Demo](https://benfletcher.github.io/github-api-demo/)

App explores some very basic Github API usage, allowing the input of a username and showing recent commits and a summary of select events.

### Notes:
- The `Events` endpoint is paginated with a fixed size of 30 records or events from the last 90 days, whichever is less
- This app currently does not look past the first page for expediency
- The username must be an exact match to that on the Github site -- no approximate matching or fuzzy logic
- Many very active users will have >30 events of a type not summarized here (I tested with some very active open source devs, e.g., 'gaearon' -- React dev Dan Abramov -- had dozens of comment reviews and no tracked events)
- Components structured to allow for easy data mocking (bypassing api calls)
- TODO: Snapshot testing using mock data passed into the display components

### Performance considerations:
- The primary challenge in parsing the events data is preventing having to iterate through the data multiple times for the Commits table and the various Event counts
- Here, the event server response is iterated through one time in a "parsing" component, which pulls out the data needed for child components to render the desired data

### Styling:
- Pretty minimal, but hopefully enough to be not painful to use :)

Feedback is appreciated!

*-Ben*