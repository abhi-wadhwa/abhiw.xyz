export default function GlassDivider({
  orientation = "horizontal",
  className = "",
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-px self-stretch bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent ${className}`}
      />
    );
  }
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent ${className}`}
    />
  );
}
