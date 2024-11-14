// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

interface Thought {
  _id: string;
  thoughtAuthor: string;
  createdAt: string;
  thoughtText: string;
}

interface ThoughtListProps {
  thoughts: Thought[];
  title: string;
}

const ThoughtList: React.FC<ThoughtListProps> = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {thought.thoughtAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                Made this review on {new Date(Number(thought.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            {/* Create a link to this thought's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Comment on this review.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
