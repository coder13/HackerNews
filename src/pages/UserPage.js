import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Comment from '../components/Comment';
import { fetchUser } from '../lib/api';

function StoryPage() {
  let { user } = useParams();

  const [data, setData] = useState(null);
  const [viewingSubmissions, setViewingSubmissions] = useState(false);

  useEffect(() => {
    fetchUser(user)
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [user]);

  return (
    <div className="flex flex-col flex-1 items-center pt-4 h-full overflow-auto">
      {data && (
        <div className="w-10/12">
          <h2 className="text-3xl">{user}</h2>
          <div className="flex flex-col mt-2">
            <div className="text-gray-600">About:</div>
            <div dangerouslySetInnerHTML={{__html: data.about}} />
          </div>
          <div className="flex flex-col mt-2">
            <div className="text-gray-600">Created:</div>
            <div>{format(data.created * 1000, 'MMMM do yyyy')}</div>
          </div>
          <div className="flex flex-col mt-2">
            <div className="text-gray-600">Karma:</div>
            <div>{data.karma}</div>
          </div>
          <div className="flex flex-col mt-2">
            <button onClick={() => setViewingSubmissions(true)}>View Submissions</button>
            {viewingSubmissions && data.submitted.map((submission) => (
              <Comment key={submission} item={submission} replyDepth={1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryPage;
