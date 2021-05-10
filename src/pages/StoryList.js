import { useEffect, useState } from 'react';
import StoryListItem from '../components/StoryListItem';
import { topStories } from '../lib/api';

function StoryList() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    topStories
      .then((s) => {
        setStories(s);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center p-2 overflow-auto">
      <h2>Top Stories</h2>
      {stories.slice(0, 20).map((story, index) => (
        <StoryListItem key={story} index={index + 1} storyId={story} />
      ))}
    </div>
  );
}

export default StoryList;
