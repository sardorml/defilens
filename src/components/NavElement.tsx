export default function NavElement({
  children,
  link,
  icon,
  selected,
}: {
  children?: React.ReactNode;
  link?: string;
  icon?: string;
  selected?: boolean;
}) {
  let style =
    "hover:bg-slate-50 hover:border-b-2 pb-[2px] hover:pb-0 border-slate-700/20 h-full px-5 text-slate-600 text-lg ";
  if (selected) {
    style += "bg-teal-50 border-b-2 border-teal-700/100 pb-0";
  }
  return <button className={style}>{children}</button>;
}
