import type { Block, Section } from "@/lib/site/content/types";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-6 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">{it}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="my-7 rounded-2xl border-l-4 border-accent bg-accent-soft/20 p-5 text-[1.0625rem] leading-7 text-fg-muted">
          {block.text}
        </div>
      );
  }
}

export function LongFormBody({ sections }: { sections: Section[] }) {
  return (
    <div className="prose-site">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24">
          <h2>{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </section>
      ))}
    </div>
  );
}

export function TableOfContents({ sections }: { sections: Section[] }) {
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="-ml-px block border-l-2 border-transparent pl-4 text-fg-muted transition hover:border-accent hover:text-accent"
            >
              {s.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
