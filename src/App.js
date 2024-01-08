import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './Components/WeatherApp';

const App = () => {
  return (
    <div>
      <WeatherApp />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App