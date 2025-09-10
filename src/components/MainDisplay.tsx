import Infograph from "./Infograph";
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

export default function MainDisplay({
  status,
  weatherData,
}: {
  status: statusType;
  weatherData: weatherDataType;
}) {
  return (
    <div className="mx-auto max-w-[1200px] p-4">
      <Infograph status={status} weatherData={weatherData}></Infograph>
    </div>
  );
}
