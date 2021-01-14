import { useEffect, useState } from 'react';
import moment from 'moment';

const { REACT_APP_API_KEY: key, REACT_APP_API_BASE_URL: url } = process.env;

const App = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [mData, setMData] = useState(null);
  const [degree, setDegree] = useState('°C');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${url}/data/2.5/weather?appid=${key}&q=California`
      );
      setMData(await response.json());
    })();
  }, []);

  const {
    weather: [{ description } = {}] = [],
    main: { temp, feels_like } = {},
    sys: { country, sunset } = {},
    name,
  } = mData || {};

  const getWeatherCondition = () => {
    if (description.includes('rain') || description.includes('thunderstorm')) {
      return 'rain';
    }

    if (Math.floor(new Date().getTime() / 1000.0) >= sunset + 3600) {
      return 'night';
    }

    if (description.includes('mist') || description.includes('cloud')) {
      return 'cloudy';
    }

    if (temp <= 273) {
      return 'cold';
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
    mData && (
      <>
        <div className={'app ' + getWeatherCondition()}>
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
                {name}, {country}
              </div>

              <div className='date'>{dateBuilder()}</div>
            </div>

            <div className='weather-box'>
              <div className='temperature' onClick={changeDegreeHandler}>
                {(degree === '°C' ? toCelsius(temp) : toFahrenheit(temp)) +
                  degree}

                <div className='feels'>
                  Feels like{' '}
                  {degree === '°C'
                    ? toCelsius(feels_like)
                    : toFahrenheit(feels_like)}
                  °
                </div>
                <div className='description'>{description}</div>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  );
};

export default App;
