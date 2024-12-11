import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

// Route to render the home page
app.get("/", (req, res) => {
  res.render("index.ejs", { wait: "Waiting for the city name..." });
});

// Route to handle city search form submissions
app.post("/submit", async (req, res) => {
  const cityName = req.body["cityName"];
  try {
    //Use the Geocoding API to retrieve the lat and lon of the city
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: `${cityName}`,
          appid: API_KEY,
        },
      }
    );

    const locations = response.data;

    const cities = locations.map((location) => ({
      name: location.name,
      state: location.state,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    }));

    //Render the index page with a list of the matching cities
    res.render("index.ejs", {
      cities: cities,
    });
  } catch (error) {
    console.error("Error fetching data from OpenWeatherMap:", error);
    res.status(500).send("Error fetching data");
  }
});

// Route to handle weather data requests for a selected city
app.post("/post-city", async (req, res) => {
  const latitude = req.body["latitude"];
  const longitude = req.body["longitude"];

  const cityName = req.body["city"];
  const stateName = req.body["state"];

  try {
    const response = await axios.get(
      //Fetch the weather data of the city using OpenWeatherMap API
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    const weatherData = response.data;

    const timezoneOffset = weatherData.timezone; // Offset in seconds
    const localDate = new Date(Date.now()); // Adjust the time

    const currentDate = localDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Render the index page with weather data and city details
    res.render("index.ejs", {
      weather: weatherData,
      cityName: cityName,
      stateName: stateName,
      currentDate: currentDate,
    });
  } catch (error) {
    console.log("Error fetching data from OpenWeatherMap:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
