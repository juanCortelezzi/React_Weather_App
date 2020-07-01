import React from "react";

const WeekWeatherCard = ({ data }) => {
  const { dt, feels_like, temp, weather, wind_speed } = data;
  const { description, icon } = weather[0];

  const dateBuilder = (unixTime) => {
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

    return `${card_day} ${card_month} ${card_date}`;
  };

  return (
    <div className="Week_weather_card_scrollcontainer">
      <div className="Week_weather_card">
        <h2 className="Week_weather_card__date">{dateBuilder(dt)}</h2>
        <div className="Week_weather_card__icon">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="weather_logo"
          />
        </div>
        <div className="Week_weather_card__morn">
          <p>Morning</p>
          <p>
            {Math.round(temp.morn)} / {Math.round(feels_like.morn)} &deg;C
          </p>
        </div>
        <div className="Week_weather_card__day">
          <p>Day</p>
          <p>
            {Math.round(temp.day)} / {Math.round(feels_like.day)} &deg;C
          </p>
        </div>
        <div className="Week_weather_card__eve">
          <p>Eve</p>
          <p>
            {Math.round(temp.eve)} / {Math.round(feels_like.eve)} &deg;C
          </p>
        </div>
        <div className="Week_weather_card__night">
          <p>Night</p>
          <p>
            {Math.round(temp.night)} / {Math.round(feels_like.night)} &deg;C
          </p>
        </div>
        <p className="Week_weather_card__minmax">
          Min-Max {Math.round(temp.min)} / {Math.round(temp.max)} &deg;C
        </p>
        <p className="Week_weather_card__windspeed">
          Wind speed {Math.round(wind_speed)} km/h
        </p>
        <p className="Week_weather_card__description">{description}</p>
      </div>
    </div>
  );
};

export default WeekWeatherCard;
