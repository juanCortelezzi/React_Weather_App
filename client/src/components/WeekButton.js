import React, { Component } from "react";
import WeekWeatherCard from "./WeekWeatherCard";
import SpinnerBloque from "./spinners/SpinnerBloque.js";

class WeekButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.latitude,
      lon: props.longitude,
      loading: false,
      error: false,
    };
  }

  onecallApiCall = () => {
    fetch(`/weatherApi/onecall/${this.state.lat},${this.state.lon}`)
      .then((x) => x.json())
      .then((x) => {
        this.setState({ onecall_data: x, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  handleClick = () => {
    this.onecallApiCall();
    this.setState({ loading: true });
  };

  render() {
    const { onecall_data, error, loading } = this.state;

    if (!onecall_data && error === false) {
      if (loading) {
        return <SpinnerBloque />;
      } else {
        return (
          <button className="Get_weather_button" onClick={this.handleClick}>
            <b>Get weekly weather</b>
          </button>
        );
      }
    } else if (onecall_data && error === false) {
      return (
        <div>
          <h1>Weekly Weather</h1>
          <div className="Week_weather_card_container">
            {onecall_data.daily.map((dayData) => {
              return <WeekWeatherCard key={dayData.dt} data={dayData} />;
            })}
          </div>
        </div>
      );
    } else {
      return <h3>We are sorry, something went wrong</h3>;
    }
  }
}

export default WeekButton;
