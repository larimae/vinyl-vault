import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReviewList from '../components/ReviewList/index.tsx';
import ReviewForm from '../components/ReviewForm/index.tsx';

import { QUERY_SINGLE_VINYL } from '../utils/queries.ts';

const SingleVinyl = () => {
  const { vinylId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_VINYL, {
    variables: { vinylId: vinylId },
  });

  const vinyl = data?.vinyl || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        <br />
        <span style={{ fontSize: '1rem' }}>
          {vinyl.song} by {vinyl.artist}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          <img
                src={vinyl.cover}
                alt={vinyl.album}
                style={{ width: '25%', height: 'auto' }}
              />
          {vinyl.vinylText}
        </blockquote>
      </div>

      <div className="my-5">
        <ReviewList reviews={vinyl.reviews} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <ReviewForm vinylId={vinyl._id} />
      </div>
    </div>
  );
};

export default SingleVinyl;
