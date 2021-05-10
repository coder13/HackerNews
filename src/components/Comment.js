import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fetchItem } from '../lib/api';

function Comment({ item, replyDepth }) {
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
    <div className="p-4">
      <div className="text-sm text-gray-400 mb-1">
        {data.by} {formatDistanceToNow(new Date(data.time * 1000))} ago
      </div>
      <div dangerouslySetInnerHTML={{__html: data.text }} />
      {data.kids && (
        <div className="flex flex-col">
          {data.kids.slice(0, replyDepth || 10).map((kid) => (
            <Comment key={kid} item={kid} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;