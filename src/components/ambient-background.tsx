// Fixed decorative backdrop: a drifting dot-grid plus three blurred "aurora"
// blobs. Purely visual — sits behind everything and never takes pointer events.
// Opacity is driven by --aurora-* tokens so light mode gets a much softer wash.
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="bg-grid absolute -inset-0.5 animate-grid-drift" />

      <div
        className="absolute -right-[120px] -top-[160px] h-[520px] w-[520px] animate-drift-a rounded-full bg-accent blur-[90px]"
        style={{ opacity: "var(--aurora-1)" }}
      />
      <div
        className="absolute -left-[160px] top-[420px] h-[460px] w-[460px] animate-drift-b rounded-full bg-teal blur-[90px]"
        style={{ opacity: "var(--aurora-2)" }}
      />
      <div
        className="absolute -bottom-[140px] right-[10%] h-[400px] w-[400px] animate-drift-a-rev rounded-full bg-accent blur-[90px]"
        style={{ opacity: "var(--aurora-3)" }}
      />
    </div>
  );
}
