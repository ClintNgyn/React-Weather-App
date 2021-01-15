import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const { REACT_APP_API_URL: url } = process.env;

// TODO: Geolocation

const App = () => {
  const [mData, setMData] = useState({});
  const [searchQuery, setSearchQuery] = useState('Montreal');
  const [degree, setDegree] = useState('°C');

  const fetchData = async () => {
    const { data } = await axios.get(`${url}&q=${searchQuery}`);
    setMData(data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    weather: [{ description } = {}] = [],
    main: { temp, feels_like } = {},
    sys: { country, sunset } = {},
    name,
  } = mData || {};

  const getWeatherCondition = () => {
    if (
      description?.includes('rain') ||
      description?.includes('thunderstorm')
    ) {
      return 'rain';
    }

    if (Math.floor(new Date().getTime() / 1000.0) >= sunset + 3600) {
      return 'night';
    }

    if (description?.includes('mist') || description?.includes('cloud')) {
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

  const changeDegreeOnClickHandler = () => {
    setDegree(degree === '°C' ? '°F' : '°C');
  };

  const searchBtnOnClickHandler = () => {
    fetchData();
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />

              <button className='btn' onClick={searchBtnOnClickHandler}>
                Search
              </button>
            </div>

            <div className='location-box'>
              <div className='location'>
                {name}, {country}
              </div>

              <div className='date'>{dateBuilder()}</div>
            </div>

            <div className='weather-box'>
              <div className='temperature' onClick={changeDegreeOnClickHandler}>
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
