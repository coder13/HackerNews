import { useEffect, useState } from 'react';
import StoryListItem from '../components/StoryListItem';
import { HACKER_NEWS_URI } from '../lib/api';

function StoryList({ title, url }) {
  const [stories, setStories] = useState([]);
  const [numStories, setNumStories] = useState(30);

  useEffect(() => {
    fetch(`${HACKER_NEWS_URI}${url}.json`)
      .then((data) => data.json())
      .then((s) => {
        if (s) {
          setStories(s);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }, [url]);

  return (
    <div className="flex flex-col flex-1 items-center p-2 overflow-auto">
      <h2>{title}</h2>
      {stories.slice(0, numStories).map((story, index) => (
        <StoryListItem key={story} index={index + 1} storyId={story} />
      ))}
      <button
        className="px-4 py-2 m-2 text-gray-600 transition-colors duration-200 transform border rounded-lg dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        onClick={() => setNumStories(numStories + 30)}
      >
        Load More Stories
      </button>
    </div>
  );
}

export default StoryList;
