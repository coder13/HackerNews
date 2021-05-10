import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { fetchItem } from '../lib/api';

function StoryPage() {
  let { item } = useParams();
  console.log(item);

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
    <div className="flex flex-col flex-1 justify-items-center items-center p-2 h-full overflow-auto">
      {!data ? (
        item
      ) : (
        <>
          <div>
            {data.title}
          </div>
          <div>
            {data.kids.map((kid) => (
              <Comment key={kid} item={kid} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StoryPage;
