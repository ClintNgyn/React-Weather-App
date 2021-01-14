import { useEffect, useState } from 'react';
import moment from 'moment';

const { REACT_APP_API_KEY: key } = process.env;

const url = 'https://api.openweathermap.org/data/2.5/weather';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  ' July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      // const response = await fetch(`${url}?appid=${key}&q=Montreal`);
      // setData(await response.json());
    })();
  }, []);

  const dateBuilder = () => {
    return moment(Date.now()).format('dddd, MMMM Do, YYYY');
  };

  const toCelsius = (kelvin) => {
    // C = K - 273
    return Math.round(kelvin - 273);
  };

  const toFahrenheit = (kelvin) => {
    // F = 1.8(K - 273) + 32
    return Math.round(1.8 * (kelvin - 273) + 32);
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
              {toCelsius(273)}

              <div className='condition'>Cloudy</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
