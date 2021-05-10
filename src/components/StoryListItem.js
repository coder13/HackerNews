import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';
import { ArrowUp } from '../components/Icons';
import { fetchItem } from '../lib/api';

function StoryListItem({ storyId, index }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchItem(storyId)
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [storyId]);

  return (
    <div className="flex w-10/12 rounded-sm p-2 my-1 transition-all shadow-sm hover:shadow-md hover:bg-gray-100 focus:ring-2">
      {!data ? storyId : (
        <>
          <button className="flex p-1 justify-items-start align-top">
            <ArrowUp />
          </button>
          <div className="flex-col flex-1">
            <div className="w-full">
              <a href={data.url}>
                {data.title}
              </a>
            </div>
            <div className="w-full text-sm text-gray-600">
              {data.score} points by {data.by} {formatDistanceToNow(new Date(data.time * 1000))} ago
              {' | '}
              <button>hide</button>
              {' | '}
              <Link to={`/item/${storyId}`}>
                {data.descendants} comments
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default StoryListItem;
