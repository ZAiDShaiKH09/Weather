import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const apiKey = '8fd55fca119342ea8c370605240301';
  const date = '2024-01-03';
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    // const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // Check if latitude and longitude are not null before making the API request
          if (position.coords.latitude !== null && position.coords.longitude !== null) {
            await getWeatherData(selectedDate);
          }
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    // };

    // fetchData();
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const getWeatherData = async (date) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${position.latitude},${position.longitude}&dt=${date}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
    <div className="weather-app-container" style={{textAlign : 'center'}}>
      <div style={{border: '2px'}}>
        <h2>Weather App</h2>
        <div>
          <h2>My Current Location </h2>
          {position.latitude && position.longitude ? (
            <p>
              Latitude: {position.latitude}, Longitude: {position.longitude}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div>
        
        </div>

        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </button>
        <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
        
        <li>
        <label>
          <input
            type="radio"
            value="2024-01-04"
            checked={selectedDate === '2024-01-04'}
            onChange={() => {
              handleDateChange('2024-01-04');
              getWeatherData('2024-01-04'); // Call getWeatherData when the date changes
            }}
          />
          04/01/2024
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2024-01-03"
            checked={selectedDate === '2024-01-03'}
            onChange={() => {
              handleDateChange('2024-01-03');
              getWeatherData('2024-01-03'); // Call getWeatherData when the date changes
            }}
          />
          03/01/2024
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2024-01-02"
            checked={selectedDate === '2024-01-02'}
            onChange={() => {
              handleDateChange('2024-01-02');
              getWeatherData('2024-01-02'); // Call getWeatherData when the date changes
            }}
          />
          02/01/2024
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2024-01-01"
            checked={selectedDate === '2024-01-01'}
            onChange={() => {
              handleDateChange('2024-01-01');
              getWeatherData('2024-01-01'); // Call getWeatherData when the date changes
            }}
          />
          01/01/2024
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2023-01-31"
            checked={selectedDate === '2023-01-31'}
            onChange={() => {
              handleDateChange('2023-01-31');
              getWeatherData('2024-01-31'); // Call getWeatherData when the date changes
            }}
          />
          31/12/2023
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2023-12-30"
            checked={selectedDate === '2023-12-30'}
            onChange={() => {
              handleDateChange('2023-12-30');
              getWeatherData('2023-12-30'); // Call getWeatherData when the date changes
            }}
          />
          30/12/2023
        </label>
        </li>
        <li>
        <label>
          <input
            type="radio"
            value="2023-12-29"
            checked={selectedDate === '2023-12-29'}
            onChange={() => {
              handleDateChange('2023-12-29');
              getWeatherData('2023-12-29'); // Call getWeatherData when the date changes
            }}
          />
          29/12/2023
        </label>
        </li>
        </ul>
        </div>
        </div> 
        {weatherData && (
          <div>
            <h3>{weatherData.location.name}</h3>
            {/* Display data for each day */}
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date}>
                <p>Date: {formatDate(day.date)}</p>
                <p>Temperature: {day.day.avgtemp_c}°C</p>
                <p>Condition: {day.day.condition.text}</p>
                <img src={day.day.condition.icon} alt={day.day.condition.text}></img>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>
        {`
          .weather-app-container {
            background-image: url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff; /* Set text color to white or a suitable color for better visibility */
          }
        `}
      </style>
    </div>
    </>
  );
};

export default WeatherApp;
