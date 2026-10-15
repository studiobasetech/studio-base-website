/**
 * Temporary block that marks where a section will go.
 * Replace each one with the real section once its mockup is built.
 */
export default function SectionPlaceholder({
  name,
  notes,
}: {
  name: string;
  notes?: string;
}) {
  return (
    <section className="px-6 py-10 lg:px-12">
      <div className="mx-auto flex min-h-[220px] max-w-7xl flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
        <p className="text-[10px] tracking-[0.45em] text-yellow-400/70">
          SECTION
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{name}</h2>
        {notes && (
          <p className="mt-3 max-w-md text-sm text-zinc-500">{notes}</p>
        )}
      </div>
    </section>
  );
}
