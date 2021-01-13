const { REACT_APP_API_KEY: key } = process.env;
const base_url = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  return (
    <>
      <div className='bg'></div>
      <div className='app'>
        <main>
          <div className='search-box'>
            <input
              type='text'
              className='search-bar'
              placeholder='Enter city'
            />
            <button className='btn'>Search</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
