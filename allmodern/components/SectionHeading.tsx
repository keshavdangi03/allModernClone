interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.35em] text-orange-600">{subtitle}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
