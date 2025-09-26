import React from "react";
import searchIcon from "../assets/images/icon-search.svg";
type locationSuggestionType = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};
interface searchProps {
  search: (query: string) => void;
  getWeather: (
    latitude: number,
    longitude: number,
    city: string,
    country: string,
  ) => Promise<void>;
}
export default function Search({ search, getWeather }: searchProps) {
  const [inputVal, setInputVal] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  React.useEffect(() => {
    async function getLocationSuggestions(query: string) {
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
        const suggestions = data.results.map(
          (item: {
            name: string;
            country: string;
            latitude: number;
            longitude: number;
          }) => ({
            city: item.name,
            country: item.country,
            latitude: item.latitude,
            longitude: item.longitude,
          }),
        );
        setStatus("success");
        setLocationSuggestions(suggestions);
        console.log(suggestions);
      } catch (err) {
        console.log(err);
        setStatus("error");
      }
    }
    getLocationSuggestions(inputVal);
  }, [inputVal]);

  function handleSuggestion(suggestion: locationSuggestionType) {
    setStatus("close");
    getWeather(
      suggestion.latitude,
      suggestion.longitude,
      suggestion.city,
      suggestion.country,
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setStatus("close");
    e.preventDefault();
    if (!inputVal) return;
    search(inputVal);
    setInputVal("");
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-neutral-000 relative mx-auto flex max-w-[650px] flex-col gap-2 p-2 px-4 md:mx-auto md:flex-row"
      >
        <div className="relative flex w-[100%] items-center rounded-[4px]">
          <div className="relative z-10 w-full">
            <input
              type="text"
              placeholder="Enter a city..."
              className="text-neutral-000 w-[100%] rounded-[4px] bg-neutral-800 p-2 pl-10"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <div className="absolute top-12 w-full bg-neutral-800 text-neutral-200">
              {status === "success" &&
                locationSuggestions.map(
                  (suggestion: locationSuggestionType, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleSuggestion(suggestion)}
                        className="p-1 hover:bg-neutral-700"
                      >
                        {suggestion.city}, {suggestion.country}
                      </div>
                    );
                  },
                )}
            </div>
          </div>
          <img
            src={searchIcon}
            alt="search Icon"
            className="pointer-events-none absolute left-2 z-10"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-[4px] bg-blue-500 p-2 md:px-4"
        >
          Search
        </button>
      </form>
    </div>
  );
}
