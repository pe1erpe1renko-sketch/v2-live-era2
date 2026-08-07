export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="block h-[6px] w-[6px] rounded-full bg-gold2" />
      <span className="type-label">{children}</span>
    </div>
  );
}
