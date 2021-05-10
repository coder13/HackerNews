import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import Comment from '../components/Comment';
import { fetchItem } from '../lib/api';

function StoryPage() {
  let { item } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchItem(item)
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [item]);

  return (
    <div className="flex flex-col flex-1 items-center pt-4 h-full overflow-auto">
      <div className="w-10/12">
        {!data ? (
          item
        ) : (
          <>
            <div>
              <a target="_blank" rel="noreferrer" href={data.url}>{data.title}</a>
            </div>
            <div className="w-full text-sm text-gray-400">
              {data.score} points by {data.by} {formatDistanceToNowStrict(new Date(data.time * 1000))} ago
              {' | '}
              <button>hide</button>
              {' | '}
              <Link to={`/item/${item}`}>
                {data.descendants} comments
              </Link>
            </div>
            <div className="flex flex-col pt-4">
              {data.kids.map((kid) => (
                <Comment key={kid} item={kid} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StoryPage;
