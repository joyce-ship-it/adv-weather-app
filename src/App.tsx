import "./App.css";
import Header from "./components/Header";
import Title from "./components/Title";
import Search from "./components/Search";

import NoResults from "./components/NoResults";
import MainDisplay from "./components/MainDisplay";
import useWeatherSearch from "./hooks/useWeatherSearch";
import HourlyForecast from "./components/HourlyForecast";
import UnitContextProvider from "./Context/UnitContextProvider";

function App() {
  const { status, weatherData, search, getWeather } = useWeatherSearch();
  console.log(status, weatherData);
  return (
    <UnitContextProvider>
      <div className="min-h-screen">
        <Header></Header>
        <Title></Title>
        <Search search={search} getWeather={getWeather}></Search>
        <NoResults status={status}></NoResults>
        <div className="max-w-[1200px] items-start md:flex md:overflow-auto">
          <MainDisplay status={status} weatherData={weatherData}></MainDisplay>
          <HourlyForecast
            status={status}
            weatherData={weatherData}
          ></HourlyForecast>
        </div>
        {status === "success" && (
          <footer className="p-4 text-center text-neutral-100">
            Made with 💓
          </footer>
        )}
      </div>
    </UnitContextProvider>
  );
}

export default App;
