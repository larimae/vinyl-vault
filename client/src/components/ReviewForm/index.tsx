import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

const ReviewForm = ({ vinylId }: { vinylId: string }) => {
  const [reviewText, setReviewText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReview, { error }] = useMutation(ADD_REVIEW);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Submitting Review for vinylId:", vinylId);
    console.log("Review Text:", reviewText);

    try {
      await addReview({
        variables: { 
          vinylId, reviewText 
        }
      });

      setReviewText('');
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'reviewText' && value.length <= 280) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this vinyl?</h4>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="reviewText"
            placeholder="Add your review..."
            value={reviewText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
