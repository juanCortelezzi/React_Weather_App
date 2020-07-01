import React, { Component } from "react";
import SpinnerBloque from "./spinners/SpinnerBloque.js";

class MainWeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.latitude,
      lon: props.longitude,
      error: false,
    };
  }

  componentDidMount() {
    this.weatherApiCall();
  }

  weatherApiCall = () => {
    fetch(`/weatherApi/weather/${this.state.lat},${this.state.lon}`)
      .then((x) => x.json())
      .then((x) => this.setState({ weather_data: [x] }))
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  dateBuilder = (unixTime) => {
    const d = new Date(unixTime * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const card_day = days[d.getDay()];
    const card_date = d.getDate();
    const card_month = months[d.getMonth()];
    //const card_year = d.getFullYear();

    return `${card_day} ${card_month} ${card_date}`;
  };

  render() {
    const { weather_data, error } = this.state;

    if (weather_data && error === false) {
      const { dt, main, name, weather, wind } = weather_data[0];
      const { feels_like, temp, temp_max, temp_min } = main;
      const { icon, description } = weather[0];

      return (
        <div className="Weather_main_card">
          <h2 className="Weather_main_card__name">{name}</h2>
          <p className="Weather_main_card__date">{this.dateBuilder(dt)}</p>
          <div className="Weather_main_card__imageContainer">
            <img
              className="Weather_main_card__imageContainer__image"
              src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
              alt="weather_logo"
            />
          </div>
          <p className="Weather_main_card__temp">{Math.round(temp)} &deg;C</p>
          <p className="Weather_main_card__realfeel">
            RealFeel {Math.round(feels_like)} &deg;C
          </p>
          <p className="Weather_main_card__maxmin">
            Min-Max {Math.round(temp_max)} / {Math.round(temp_min)} &deg;C
          </p>
          <p className="Weather_main_card__windspeed">
            wind speed {wind.speed} km/h
          </p>
          <p className="Weather_main_card__description">{description}</p>
        </div>
      );
    } else if (!weather_data && error === false) {
      return (
        <div className="Weather_main_card">
          <SpinnerBloque />
        </div>
      );
    } else {
      return <h3>something went wrong</h3>;
    }
  }
}

export default MainWeatherCard;
