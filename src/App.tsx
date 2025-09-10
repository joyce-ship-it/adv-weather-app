import "./App.css";
import Header from "./components/Header";
import Title from "./components/Title";
import Search from "./components/Search";

import NoResults from "./components/NoResults";
import MainDisplay from "./components/MainDisplay";
import useWeatherSearch from "./hooks/useWeatherSearch";

function App() {
  // React.useEffect(() => {
  //   async function getLocation() {
  //     const response = await fetch(
  //       `https://geocoding-api.open-meteo.com/v1/search?name=chennai&count=1&language=en&format=json`,
  //     );
  //     const data = await response.json();
  //     if (!data.results) {
  //       console.log("empty");
  //       return;
  //     }

  //     const { name: city, country, latitude, longitude } = data.results[0];
  //     const weatherResponse = await fetch(
  //       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=weather_code,apparent_temperature&current=wind_speed_10m,apparent_temperature,temperature_2m,precipitation,relative_humidity_2m,weather_code&timezone=auto`,
  //     );
  //     const weatherData = await weatherResponse.json();
  //     console.log(weatherData);
  //   }

  //   getLocation();
  // }, []);

  const { status, weatherData, search } = useWeatherSearch();
  console.log(status, weatherData);
  return (
    <div>
      <Header></Header>
      <Title></Title>
      <Search search={search}></Search>
      <NoResults status={status}></NoResults>
      <MainDisplay status={status} weatherData={weatherData}></MainDisplay>
    </div>
  );
}

export default App;
