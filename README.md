# Meteo App 🌤️

Meteo App is a weather application that provides detailed weather information for cities with a simple and user-friendly interface.

## Overview

The Meteo App leverages OpenWeatherMap API to fetch and display real-time weather data. Built using Node.js, Express, and EJS, it demonstrates the seamless integration of backend and frontend technologies to deliver a responsive user experience.

## Features

- **City Search:** Enter a city name to search for its weather information.
- **Multiple City Matches:** If multiple cities match the input, the app displays all options, allowing users to select the correct city.
- **Detailed Weather Data:** Displays key weather details, including temperature, weather condition, humidity, wind speed, and more.
- **Dynamic Timezone Support:** Displays the current date and time adjusted for the city’s timezone.

## Technologies Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express:** Web application framework for handling routes and middleware.
- **EJS:** Template engine for rendering dynamic HTML.
- **Axios:** HTTP client for making API requests.
- **HTML/CSS/JavaScript:** Frontend technologies for styling and interactivity.

## Getting Started

1. Clone the repository: `git clone https://github.com/asavvidi/my-meteo-app.git`
2. Navigate to the project directory: `cd my-meteo-app`
3. Install dependencies: `npm install`
4. Create a .env file in the root directory and add your OpenWeatherMap API key
5. Start the development server: `node index.js`
6. Open [http://localhost:3000](http://localhost:3000) in your browser to access the Meteo App.
