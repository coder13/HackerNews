const HACKER_NEWS_URI = 'https://hacker-news.firebaseio.com/v0/'

const toJson = (data) => data.json();

export const topStories = fetch(`${HACKER_NEWS_URI}/topstories.json`).then(toJson);

export const fetchItem = (url) => fetch(`${HACKER_NEWS_URI}item/${url}.json`).then(toJson);