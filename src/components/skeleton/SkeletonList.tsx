export function SkeletonList() {
  return (
    <div className="animate-pulse">
      <div className="h-[52px] bg-gray-100 rounded-lg dark:bg-gray-300 mb-4"></div>
    </div>
  );
}

export function SkeletonCard({
  width,
  height,
  rounded = false,
}: {
  width: number;
  height: number;
  rounded?: boolean;
}) {
  const className = `animate-pulse bg-gray-100 dark:bg-gray-300 ${
    rounded ? "rounded-lg" : ""
  }`;
  return (
    <div className={className} style={{ width: width, height: height }}></div>
  );
}
