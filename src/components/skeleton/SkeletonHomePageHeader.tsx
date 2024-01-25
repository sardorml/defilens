import { SkeletonCard } from "./SkeletonList";

export default function SkeletonHomePageHeader() {
  return (
    <div className="flex justify-between mb-10">
      <div className="flex flex-col">
        <SkeletonCard w="100" h="32" />
        <div className="mt-2">
          <SkeletonCard w="200" h="20" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <SkeletonCard w="100" h="60" />
      </div>
    </div>
  );
}
