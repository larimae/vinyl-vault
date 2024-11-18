import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useQuery } from '@apollo/client';
import VinylList from '../components/VinylList/index.tsx';
import { QUERY_VINYLS, QUERY_SEARCHVINYL } from '../utils/queries.ts';

const Home = () => {
  const [vinyls, setVinyls] = useState([]);
  const [vinylText, setVinylText] = useState('');
  const { loading, data } = useQuery(QUERY_VINYLS);
  const { loading: loading2, data: data2, refetch } = useQuery(QUERY_SEARCHVINYL, {
    variables: { input: vinylText },
  });
  const [formSubmitted, setformSubmitted] = useState(false);

  useEffect(() => {
    if (!loading) {
      setVinyls(data?.vinyls);
    };
  }, [data])
  useEffect(() => {
    console.log(vinyls);
  }, [vinyls])
  useEffect(() => {
    refetch()
    console.log(data2);
    if (formSubmitted && data2.findVinyl.length > 0) {
        setVinyls(data2?.findVinyl);
    }
  }, [formSubmitted, data2])
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {

      setformSubmitted(true);
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
