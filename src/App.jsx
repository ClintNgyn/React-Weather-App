import { useEffect, useState } from 'react';
import moment from 'moment';

const { REACT_APP_API_KEY: key, REACT_APP_API_BASE_URL: url } = process.env;

const App = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState();
  const [degree, setDegree] = useState('°C');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${url}/data/2.5/weather?appid=${key}&q=Montreal`
      );
      setData(await response.json());
    })();
  }, []);

  const getWeatherCondition = () => {
    const {
      weather: [{ description }],
      sys: { sunset },
      dt,
    } = data;

    if (description.includes('rain')) {
      return 'rain';
    }

    if (dt + 3600 >= sunset) {
      return 'night';
    }

    return '';
  };

  const dateBuilder = () => {
    return moment(Date.now()).format('dddd, MMMM Do, YYYY');
  };

  const toCelsius = (kelvin) => {
    return Math.round(kelvin - 273);
  };

  const toFahrenheit = (kelvin) => {
    return Math.round(1.8 * (kelvin - 273) + 32);
  };

  const changeDegreeHandler = () => {
    setDegree(degree === '°C' ? '°F' : '°C');
  };

  return (
    <>
      <div
        className={
          typeof data === 'undefined' ? '' : 'app' + getWeatherCondition()
        }
      >
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
            <div className='location'>
              {data?.name}, {data?.sys?.country}
            </div>

            <div className='date'>{dateBuilder()}</div>
          </div>

          <div className='weather-box'>
            <div className='temperature' onClick={changeDegreeHandler}>
              {(degree === '°C'
                ? toCelsius(data?.main?.temp)
                : toFahrenheit(data?.main?.temp)) + degree}

              <div className='condition'>{data?.weather[0]?.description}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
