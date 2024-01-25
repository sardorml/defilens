import { SkeletonCard, SkeletonList } from "../SkeletonList";

export default function SkeletonProtocolHeader() {
  return (
    <>
      <div className="flex justify-between my-5">
        <div className="flex items-center">
          <SkeletonCard width={64} height={64} rounded />
          <div className="flex flex-col justify-center ml-2">
            <div className="mb-2">
              <SkeletonCard width={100} height={32} />
            </div>
            <SkeletonCard width={100} height={20} />
          </div>
        </div>
        <SkeletonCard width={60} height={64} />
      </div>
    </>
  );
}
