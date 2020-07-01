import React, { Component } from "react";
import "./App.css";
import MainWeatherCard from "./components/MainWeatherCard.js";
import WeekButton from "./components/WeekButton.js";
import ErrorBoundary from "./components/ErrorBoundary.js";
import SpinnerBloque from "./components/spinners/SpinnerBloque.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      has_geo: false,
      allows_geo: false,
    };
  }

  get_geolocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.setState({
          latlon: [lat, lon],
          has_geo: true,
          allows_geo: true,
        });
      },
      (err) => {
        err.code === 1
          ? this.setState({ has_geo: true, allows_geo: false })
          : this.setState({ has_geo: true, allows_geo: true });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  componentDidMount() {
    this.get_geolocation();
  }

  render() {
    const { latlon, has_geo, allows_geo } = this.state;
    if (!has_geo || !allows_geo)
      return (
        <div className="App">
          <h1>no geo available</h1>
        </div>
      );
    if (!latlon) {
      return (
        <div className="App">
          <SpinnerBloque />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1 className="App__header">Weather App</h1>
          <ErrorBoundary>
            <MainWeatherCard latitude={latlon[0]} longitude={latlon[1]} />
            <WeekButton latitude={latlon[0]} longitude={latlon[1]} />
          </ErrorBoundary>
        </div>
      );
    }
  }
}

export default App;
