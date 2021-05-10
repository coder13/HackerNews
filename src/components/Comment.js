import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import { fetchItem } from '../lib/api';

function Comment({ item, replyDepth, toggle }) {
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

  if (!data) {
    return (
      <div className="flex p-4">
        {item}
      </div>
    )
  }

  return (
    <div className={clsx('mt-4 p-1', {
      'bg-white': !toggle,
      'bg-gray-50': toggle,
    })}>
      <div className="text-sm text-gray-400 mb-1">
        {data.by} {formatDistanceToNowStrict(new Date(data.time * 1000))} ago
      </div>
      <div dangerouslySetInnerHTML={{__html: data.text }} />
      {data.kids && (
        <div className="flex flex-col px-4">
          {data.kids.slice(0, replyDepth || 10).map((kid) => (
            <Comment key={kid} item={kid} toggle={!toggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;