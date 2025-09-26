import errorIcon from "../assets/images/icon-error.svg";
type statusType = "idle" | "loading" | "success" | "error" | "empty";
type locationDataType = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};
export default function Error({
  status,
  locationData,
  getWeather,
}: {
  status: statusType;
  locationData: locationDataType;
  getWeather: (
    latitude: number,
    longitude: number,
    city: string,
    country: string,
  ) => Promise<void>;
}) {
  if (status === "error") {
    return (
      <div className="mx-auto flex max-w-[500px] flex-col gap-3 pt-15 text-neutral-100">
        <div className="mx-auto h-8 w-8">
          <img src={errorIcon} alt="error Icon" className="h-full w-full" />
        </div>
        <h1 className="text-center text-4xl font-bold">Something went wrong</h1>
        <p className="text-center text-neutral-500">
          We couldn't connect to the server (Api error). Please try again in a
          few moments
        </p>
        <button
          onClick={() =>
            getWeather(
              locationData.latitude,
              locationData.longitude,
              locationData.city,
              locationData.country,
            )
          }
          className="mx-auto block rounded-xl bg-neutral-800 px-4 py-2"
        >
          Retry
        </button>
      </div>
    );
  }
}
