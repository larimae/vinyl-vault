// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

interface Vinyl {
  _id: string;
  artist: string;
  createdAt: string;
  vinylText: string;
}

interface VinylListProps {
  vinyls: Vinyl[];
  title: string;
}

const VinylList: React.FC<VinylListProps> = ({ vinyls, title }) => {
  if (!vinyls.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {vinyls &&
        vinyls.map((vinyl) => (
          <div key={vinyl._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {vinyl.artist} <br />
              <span style={{ fontSize: '1rem' }}>
                Made this review on {new Date(Number(vinyl.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{vinyl.vinylText}</p>
            </div>
            {/* Create a link to this vinyl's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/vinyls/${vinyl._id}`}
            >
              Comment on this review.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default VinylList;
