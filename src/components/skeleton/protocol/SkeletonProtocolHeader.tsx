import { SkeletonCard, SkeletonList } from "../SkeletonList";

export default function SkeletonProtocolHeader() {
  return (
    <>
      <div className="flex justify-between my-5">
        <div className="flex items-center">
          <SkeletonCard w="64" h="64" rounded />
          <div className="flex flex-col justify-center ml-2">
            <div className="mb-2">
              <SkeletonCard w="100" h="32" />
            </div>
            <SkeletonCard w="100" h="20" />
          </div>
        </div>
        <SkeletonCard w="60" h="64" />
      </div>
    </>
  );
}
