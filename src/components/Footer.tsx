type statusType = "idle" | "loading" | "success" | "error" | "empty";

export default function Footer({ status }: { status: statusType }) {
  if (status === "success") {
    return (
      <footer className="p-4 text-center text-neutral-100">Made with 💓</footer>
    );
  }
}
