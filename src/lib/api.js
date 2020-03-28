const origin = 'https://hacker-news.firebaseio.com/v0/';

const json = data => data.json();

export function fetchItem(url) {
  return fetch(`${origin}item/${url}.json`).then(json);
}

export function fetchTopStories() {
  return fetch(`${origin}topstories.json`).then(json);
}
