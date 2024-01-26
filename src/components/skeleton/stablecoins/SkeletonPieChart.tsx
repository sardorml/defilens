import { SkeletonRound } from "../SkeletonList";

export default function SkeletonPieChart({}) {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <SkeletonRound w="250" h="250" />
    </div>
  );
}
