const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const hostname = "localhost";
const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};

app.use(logger);

app.get("/weatherapi/weather/:latlon", async (req, res) => {
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const fetch_response = await fetch(api_url)
    .then((x) => x.json())
    .catch((err) => console.log(err));
  res.json(fetch_response);
});

app.get("/weatherapi/onecall/:latlon", async (req, res) => {
  const latlon = req.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly&appid=${apiKey}&units=metric`;
  const fetch_response = await fetch(api_url)
    .then((x) => x.json())
    .catch((err) => console.log(err));
  res.json(fetch_response);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () =>
  console.log(`server running at http://${hostname}:${port}`)
);
