import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let API_KEY = "c59d61fb5400026251cf50b3edf6f44e";

app.get("/", (req, res) => {
  res.render("index.ejs", { wait: "Waiting for the city name..." });
});

app.post("/submit", async (req, res) => {
  const cityName = req.body["cityName"];
  try {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: `${cityName},GR`,
          appid: API_KEY,
        },
      }
    );

    const location = response.data[0];
    const lat = location.lat;
    const lon = location.lon;
    const city = location.name;
    const state = location.state;

    res.render("index.ejs", {
      latitude: lat,
      longitude: lon,
      city: city,
      state: state,
    });
  } catch (error) {
    console.error("Error fetching data from OpenWeatherMap:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post("/post-city", async (req, res) => {
  const latitude = req.body["latitude"];
  const longitude = req.body["longitude"];

  const cityName = req.body["city"];
  const stateName = req.body["state"];

  try {
    const response = await axios.get(
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
