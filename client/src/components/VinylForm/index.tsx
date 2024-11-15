import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_VINYL } from '../../utils/mutations';
import { QUERY_VINYLS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const VinylForm = () => {
  const [vinylText, setVinylText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addVinyl, { error }] = useMutation
    (ADD_VINYL, {
      refetchQueries: [
        QUERY_VINYLS,
        'getVinyls',
        QUERY_ME,
        'me'
      ]
    });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addVinyl({
        variables: {
          input: {
            vinylText,
            artist: Auth.getProfile().data.username,
          }
        },
      });

      setVinylText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'vinylText' && value.length <= 280) {
      setVinylText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="vinylText"
                placeholder="Here's a new vinyls..."
                value={vinylText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Vinyls
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your vinyls. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default VinylForm;