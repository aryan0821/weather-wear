import React, { useState } from 'react';
import Pin from './Pin';
import 'bootstrap/dist/css/bootstrap.css';
import SummerData from "./SummerData";
import SpringData from './SpringData';
import AutumnData from './AutumnData';
import WinterData from './WinterData';


const api = {
  key: "c1bfb6bdd80bf13b5719832a62f318db",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        }
        );
    }
  }

  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.feels_like > 17) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="header">
          <div className="logo"></div>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a city..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">Feels Like {Math.round(weather.main.feels_like)}°C</div>
              <div className="weather">{weather.weather[0].description.toUpperCase()}</div>
            </div>
            <div className='suggestions-container'>
              <div className="suggestions">Weatherwear Suggestions</div>
            </div>
            <div className="main-container">
              {
                renderPins()
              }
            </div>
          </div>

        ) : (
          <div className="begin">
            <div className="welcome">Welcome to Weather Wear</div>
            <div className="motto">Dress Accordingly.</div>
          </div>
        )}
      </main>
    </div>
  );

  function renderPins() {
    if (weather.main.feels_like > 30) {
      return SummerData && SummerData.map((data) => (
        <Pin key={data.id} pinSize={data.size} imgSrc={data.imgSrc} season={data.season} />
      ));
    }
    else if (weather.main.feels_like > 20) {
      return SpringData && SpringData.map((data) => (
        <Pin key={data.id} pinSize={data.size} imgSrc={data.imgSrc} season={data.season} />
      ));
    }
    else if (weather.main.feels_like > 10) {
      return AutumnData && AutumnData.map((data) => (
        <Pin key={data.id} pinSize={data.size} imgSrc={data.imgSrc} season={data.season} />
      ));
    }
    else {
      return WinterData && WinterData.map((data) => (
        <Pin key={data.id} pinSize={data.size} imgSrc={data.imgSrc} season={data.season} />
      ));
    }
  }
}

export default App;
