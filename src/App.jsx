import { useEffect, useState } from 'react';

const {
  REACT_APP_API_KEY: key,
  REACT_APP_BASE_URL: url,
  REACT_APP_MONTHS: months,
  REACT_APP_DAYS: days,
} = process.env;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}?appid=${key}&q=Montreal`);
      setData(await response.json());
    })();
  }, []);

  const dateBuilder = () => {
    const d = new Date();
    return `${d.getDay()}, ${d.getMonth()} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <>
      {console.log(data)}
      <div className='app'>
        <main>
          <div className='search-box'>
            <input
              type='text'
              className='search-bar'
              placeholder='Enter City'
            />
            <button className='btn'>Search</button>
          </div>

          <div className='location-box'>
            <div className='location'>London, UK</div>
            <div className='date'>{dateBuilder()}</div>
          </div>

          <div className='weather-box'>
            <div className='temperature'>
              35°F
              <div className='condition'>Cloudy</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
