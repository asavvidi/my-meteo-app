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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
