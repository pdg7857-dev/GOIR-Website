import { CITATIONS, getCitation, type Citation } from "@/lib/site/citations";

/**
 * Inline statistic. Renders the figure in emphasis with a small reference
 * marker. When the citation is not yet verified, it carries a clear
 * "source pending" affordance so an unverified number never reads as a hard,
 * attributed fact.
 */
export function Stat({ id, plain = false }: { id: string; plain?: boolean }) {
  const c = getCitation(id);
  if (!c) return null;
  if (plain) return <span className="font-semibold text-fg">{c.value}</span>;
  return (
    <span className="font-semibold text-fg">
      {c.value}
      <CiteMark c={c} />
    </span>
  );
}

/** Small superscript reference marker after a claim. */
export function Cite({ id }: { id: string }) {
  const c = getCitation(id);
  if (!c) return null;
  return <CiteMark c={c} />;
}

function CiteMark({ c }: { c: Citation }) {
  if (c.verified && c.url) {
    return (
      <a
        href={c.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        title={`${c.source}${c.year ? `, ${c.year}` : ""}`}
        className="ml-0.5 align-super text-[0.6em] font-semibold text-accent no-underline hover:underline"
      >
        [src]
      </a>
    );
  }
  return (
    <sup
      title="Source pending verification"
      className="ml-0.5 align-super text-[0.6em] font-semibold text-warn"
    >
      [source pending]
    </sup>
  );
}

/** A boxed statistic for use inside long-form bodies. */
export function StatCallout({ id }: { id: string }) {
  const c = getCitation(id);
  if (!c) return null;
  return (
    <div className="my-7 flex gap-4 rounded-2xl border border-border bg-bg-subtle p-5">
      <div className="text-3xl font-bold leading-none text-accent">{c.value}</div>
      <div className="min-w-0">
        <p className="text-fg-muted">{c.claim}</p>
        <p className="mt-1 text-xs text-fg-muted">
          {c.verified ? (
            <>
              Source: {c.source}
              {c.year ? `, ${c.year}` : ""}
              {c.url ? (
                <>
                  {" "}
                  <a href={c.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                    reference
                  </a>
                </>
              ) : null}
            </>
          ) : (
            <span className="text-warn">Source pending verification against the research report.</span>
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * A full references section listing every citation used on a page. Pass the
 * ids referenced on that page; defaults to all.
 */
export function References({ ids }: { ids?: string[] }) {
  const list = (ids ?? Object.keys(CITATIONS))
    .map((id) => getCitation(id))
    .filter(Boolean) as Citation[];
  if (list.length === 0) return null;
  return (
    <div className="mt-12 rounded-2xl border border-border bg-bg-subtle p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Sources & citations</h3>
      <ol className="mt-4 space-y-3 text-sm">
        {list.map((c) => (
          <li key={c.id} className="text-fg-muted">
            <span className="font-medium">{c.claim}</span>{" "}
            {c.verified ? (
              <span className="text-fg-muted">
                {c.source}
                {c.year ? `, ${c.year}` : ""}.
                {c.url ? (
                  <>
                    {" "}
                    <a href={c.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent underline">
                      Link
                    </a>
                  </>
                ) : null}
              </span>
            ) : (
              <span className="text-warn">Source pending verification.</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
