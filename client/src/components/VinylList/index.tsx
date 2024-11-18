// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

interface Vinyl {
  _id: string;
  vinylText: string;
    artist: string;
    song: string;
    album: string;
    cover: string;
    genre: string;
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
                Song: {vinyl.song}
                <br />
                Album: {vinyl.album}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{vinyl.vinylText}</p>
              <p>{vinyl.genre}</p>
              <img
                src={vinyl.cover}
                alt={vinyl.album}
                style={{ width: '100%', height: 'auto' }}
              />
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
