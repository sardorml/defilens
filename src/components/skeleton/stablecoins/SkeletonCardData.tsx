import { SkeletonCard } from "../SkeletonList";

export default function SkeletonCardData() {
  return (
    <div className="flex flex-col shadow-sm rounded-lg p-4 mb-2">
      <SkeletonCard h="24" w="100" />
      <div className="mt-2">
        <SkeletonCard h="28" w="140" />
      </div>
    </div>
  );
}
