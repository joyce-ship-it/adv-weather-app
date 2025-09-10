import smallBg from "../assets/images/bg-today-small.svg";
type statusType = "idle" | "loading" | "success" | "error" | "empty";
type weatherDataType = {
  city: string;
  country: string;
  current: {
    apparent_temperature: number;
    temperature_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    relative_humidity_2m: number;
    time: string;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    weather_code: number[];
    apparent_temperature: number[];
  };
};
export default function Infograph({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType;
}) {
  console.log(status);
  if (status === "loading") {
    return (
      <div className="grid min-h-[300px] place-content-center bg-neutral-400">
        loading...
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        style={{
          backgroundImage: `url(${smallBg})`,
        }}
        className={`min-h-[300px] bg-cover bg-no-repeat`}
      >
        <div>
          <h2>
            {weatherData.city} {weatherData.country}
          </h2>
          <p> {weatherData.current.time}</p>
        </div>
        <div>
          <img src="" alt={status} />
          <p></p>
        </div>
      </div>
    );
  }
}
