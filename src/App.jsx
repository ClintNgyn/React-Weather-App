const { REACT_APP_API_KEY: key } = process.env;
const base_url = 'https://api.openweathermap.org/data/2.5/weather';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
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
  const dateBuilder = (d) => {
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <>
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
            <div className='date'>{dateBuilder(new Date())}</div>
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
