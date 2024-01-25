import { parse } from "path";

export function SkeletonList() {
  return (
    <div className="animate-pulse">
      <div className="h-[52px] bg-slate-100 rounded-lg mb-4"></div>
    </div>
  );
}
interface SkeletonCarProps {
  w: string;
  h: string;
  rounded?: boolean;
}

export function SkeletonCard({ w, h, rounded = false }: SkeletonCarProps) {
  const className = `animate-pulse bg-slate-100 ${rounded ? "rounded-lg" : ""}`;
  const width = w.includes("%") ? w : parseInt(w);
  const height = h.includes("%") ? h : parseInt(h);
  return (
    <div className={className} style={{ width: width, height: height }}></div>
  );
}
