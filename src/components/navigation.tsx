import { AtSymbolIcon, LanguageIcon } from "@heroicons/react/24/outline";
export default function Navigation() {
  return (
    <header className="sticky top-0 bg-white/60 backdrop-blur-2xl backdrop-filter z-[10]">
      <div className="flex justify-between py-3 border-b border-slate-200 max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center">
            <span className="text-rose-400">defi</span>
            <span className="text-slate-700">lens</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm text-slate-700">
            Eth price: <span className="font-medium">$2,523</span>
          </span>
          <span className="text-sm text-slate-700">
            Gas fee: <span className="font-medium">23 Gwei</span>
          </span>
        </div>
      </div>
    </header>
  );
}
