import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
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
          {index && (<div className="text-lg flex w-6 items-center justify-end"><span>{index}</span></div>)}
          <button className="flex p-1 items-center align-top">
            <ArrowUp />
          </button>
          <div className="flex-col flex-1">
            <div className="w-full">
              <a target="_blank" rel="noreferrer" href={data.url}>
                {data.title}
              </a>
            </div>
            <div className="w-full text-sm text-gray-400">
              {data.score} points by
              {' '}
              <Link className="hover:underline" to={`/user/${data.by}`}>{data.by}</Link>
              {' '}
              <Link className="hover:underline" to={`/item/${data.item}`}>{formatDistanceToNowStrict(new Date(data.time * 1000))} ago</Link>
              {' | '}
              <button>hide</button>
              {' | '}
              <Link className="hover:underline" to={`/item/${storyId}`}>
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
