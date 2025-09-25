import React from "react";
type statusType = "idle" | "loading" | "success" | "error" | "empty";

// https://geocoding-api.open-meteo.com/v1/search?name=nnkj&count=1&language=en&format=json
type LocationType = {
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
};

export default function useWeatherSearch() {
  const [status, setStatus] = React.useState<statusType>("idle");
  const [weatherData, setWeatherData] = React.useState(null);
  const [locationData, setLocationData] = React.useState<LocationType | null>(
    null,
  );

  async function getLocation(query: string) {
    const url1 = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;
    try {
      setStatus("loading");
      const res = await fetch(url1);
      if (!res.ok) {
        throw new Error("Server error while fetching co-ordinates");
      }
      const data = await res.json();
      if (!data.results) {
        setStatus("empty");
        return;
      }
      console.log(data);
      const { name: city, country, latitude, longitude } = data.results[0];
      const location = { city, country, latitude, longitude };
      setLocationData(location);
      return location;
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  }
  async function getWeather(
    latitude: number,
    longitude: number,
    city: string,
    country: string,
  ) {
    const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=weather_code,apparent_temperature&current=wind_speed_10m,apparent_temperature,temperature_2m,precipitation,relative_humidity_2m,weather_code&timezone=auto`;

    try {
      setStatus("loading");
      const res = await fetch(url2);
      if (!res.ok) {
        throw new Error("Server error while fetching weather data");
      }
      const data = await res.json();
      setWeatherData({ ...data, city, country });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  }
  async function search(query: string) {
    const location = await getLocation(query);
    if (location) {
      await getWeather(
        location.latitude,
        location.longitude,
        location.city,
        location.country,
      );
    }
  }
  return { status, weatherData, locationData, search, getWeather };
}
