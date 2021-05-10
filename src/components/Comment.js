import { useEffect, useState } from 'react';
import { fetchItem } from '../lib/api';

function Comment({ item }) {
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
      <div className="flex p-2">
        {item}
      </div>
    )
  }

  return (
    <div className="flex flex-col p-2">
      <div dangerouslySetInnerHTML={{__html: data.text }} />
      {data.kids && (
        <div className="flex flex-col">
          {data.kids.map((kid) => (
            <Comment key={kid} item={kid} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;