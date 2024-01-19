import NavElement from "./NavElement";

export default function Navigation() {
  return (
    <header className="mx-auto max-w-7xl xl:px-8 sticky top-0 bg-zinc-50 bg-zinc-50/50 backdrop-blur backdrop-filter z-[10]">
      <div className="flex justify-between py-5 border-b border-slate-300">
        <h1 className="text-4xl font-bold text-slate-700 flex items-center">
          Defilens
        </h1>
      </div>
    </header>
  );
}
