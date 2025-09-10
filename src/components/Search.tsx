import React from "react";
import searchIcon from "../assets/images/icon-search.svg";

export default function Search({
  search,
}: {
  search: (query: string) => void;
}) {
  const [inputVal, setInputVal] = React.useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputVal) return;
    search(inputVal);
    setInputVal("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="text-neutral-000 flex max-w-[650px] flex-col gap-2 p-4 md:mx-auto md:flex-row"
    >
      <div className="relative flex w-[100%] items-center rounded-[4px]">
        <input
          type="text"
          placeholder="Enter a city..."
          className="text-neutral-000 w-[100%] rounded-[4px] bg-neutral-800 p-2 pl-10"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search Icon"
          className="pointer-events-none absolute left-2"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-[4px] bg-blue-500 p-2 md:px-4"
      >
        Search
      </button>
    </form>
  );
}
