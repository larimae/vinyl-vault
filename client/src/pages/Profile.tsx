import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_REVIEWS } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading: userLoading, data: userData } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading: reviewsLoading } = useQuery(QUERY_REVIEWS);

  const user = userData?.me || userData?.user || {};
  const vinyls = user.vinyls || [];

  
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return <Navigate to="/me" />;
  }

  if (userLoading || reviewsLoading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {/* Render reviews with vinyl context */}
        <div className="col-12 col-md-10 mb-5">
          <h3>Reviews by {userParam ? user.username : 'you'}:</h3>
          {vinyls.length ? (
            <ul>
              {vinyls.map((vinyl: any) => (
                <li key={vinyl._id}>
                  <strong>Song:</strong> {vinyl.song} by {vinyl.artist} <br />
                  <strong>Album:</strong> {vinyl.album} <br />
                  <img
                  src={vinyl.cover}
                  alt={vinyl.album}
                  style={{ width: '25%', height: 'auto' }}
                  />
                  {vinyl.reviews.length ? (
                    <ul>
                      {vinyl.reviews.map((review: any) => (
                        <li>
                            <strong>Review:</strong> {review.reviewText}
                        </li> 
                      ))}
                    </ul> 
                  ): (
                    <p>No reviews found for this vinyl.</p>
                  )}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>

        {/* Render additional profile actions */}
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            {/* Placeholder for additional actions */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
