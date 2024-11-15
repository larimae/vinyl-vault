interface Review {
  _id: string;
  createdAt: string;
  reviewText: string;
}

interface ReviewListProps {
  reviews?: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews = [] }) => {
  console.log(reviews);
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Reviews
      </h3>
      <div className="flex-row my-4">
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  An anonymous user reviewed{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {new Date(Number(review.createdAt)).toLocaleString()}
                  </span>
                </h5>
                <p className="card-body">{review.reviewText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReviewList;
