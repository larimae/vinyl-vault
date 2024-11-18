import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import VinylList from '../components/VinylList/index.tsx';
import { QUERY_VINYLS } from '../utils/queries.ts';
import { SEARCH_VINYL } from '../utils/mutations.ts';
const Home = () => {
  const [vinyls, setVinyls] = useState([]);
  const [vinylText, setVinylText] = useState('');
  const { loading, data } = useQuery(QUERY_VINYLS);
  const [findVinyl] = useMutation(SEARCH_VINYL);

  useEffect(() => {
    if (!loading) {
      setVinyls(data?.vinyls);
    };
  }, [data])
  useEffect(() => {
    console.log(vinyls);
  }, [vinyls])

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await findVinyl ({
        variables: { input: vinylText },
      })
      setVinyls(data?.findVinyl)
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'vinylText' && value.length <= 280) {
      setVinylText(value);
    }
  };
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <nav className="navbar navbar-light bg-light">
            <form onSubmit={handleFormSubmit} className="form-inline">
              <input name="vinylText"
                value={vinylText}
                onChange={handleChange}
                className="form-control mr-sm-2"
                type="search" placeholder="Search"
                aria-label="Search" />

              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </nav>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <VinylList
              vinyls={vinyls}
              title="Some other review(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
