export const HACKER_NEWS_URI = 'https://hacker-news.firebaseio.com/v0/'

export const topStories = fetch(`${HACKER_NEWS_URI}/topstories.json`).then((data) => data.json());

export const newStories = fetch(`${HACKER_NEWS_URI}/newstories.json`).then((data) => data.json());

export const bestStories = fetch(`${HACKER_NEWS_URI}/beststories.json`).then((data) => data.json());

export const fetchItem = (url) => fetch(`${HACKER_NEWS_URI}item/${url}.json`).then((data) => data.json());

export const fetchUser = (user) => fetch(`${HACKER_NEWS_URI}user/${user}.json`).then((data) => data.json());
