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
app.get("/submit", (req, res) => {
  const cityName = req.query["cityName"];
  res.render("index.ejs", { cityName: cityName });
  //const response = await axios.get('')
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
