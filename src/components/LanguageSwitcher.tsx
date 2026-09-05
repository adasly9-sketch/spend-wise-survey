import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useT, type Lang } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]!;

  return (
    <div ref={rootRef} className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("langLabel")}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-accent"
      >
        <span aria-hidden className="text-base leading-none">
          {current.flag}
        </span>
        <span>{current.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={"transition " + (open ? "rotate-180" : "")}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("langLabel")}
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-card shadow-lg"
        >
          {LANGUAGES.map((l) => {
            const selected = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setLang(l.code as Lang);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition " +
                    (selected
                      ? "bg-primary/10 font-semibold text-foreground"
                      : "text-foreground hover:bg-accent")
                  }
                >
                  <span aria-hidden className="text-base leading-none">
                    {l.flag}
                  </span>
                  <span>{l.label}</span>
                  {selected ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="ml-auto text-primary"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
