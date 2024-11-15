import { useQuery } from '@apollo/client';

import VinylList from '../components/VinylList/index.tsx';
import VinylForm from '../components/VinylForm/index.tsx';

import { QUERY_VINYLS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VINYLS);
  const vinyls = data?.vinyls || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <VinylForm />
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
