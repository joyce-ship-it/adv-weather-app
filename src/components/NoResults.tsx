type NoResultsProps = {
  status: "idle" | "empty" | "loading" | "success" | "error";
};

export default function NoResults({ status }: NoResultsProps) {
  return (
    <h2 className="text-neutral-000 max-w-[1200px] pt-4 text-center font-medium">
      {status === "idle" && "Enter a location above to get started"}
      {status === "empty" && "No search results found!"}
    </h2>
  );
}
