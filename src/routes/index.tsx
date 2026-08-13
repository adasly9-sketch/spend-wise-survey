import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Informed Consent — Physical-Appearance Spending Study" },
      {
        name: "description",
        content:
          "This is a consent form for an academic research study on disposable income spending related to physical appearance and personal care.",
      },
      {
        property: "og:title",
        content: "Informed Consent — Physical-Appearance Spending Study",
      },
      {
        property: "og:description",
        content:
          "This is a consent form for an academic research study on disposable income spending related to physical appearance and personal care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  const navigate = useNavigate();

  const handleConsent = () => {
    try {
      localStorage.setItem("thesis-consent", JSON.stringify({ consented: true, at: new Date().toISOString() }));
      localStorage.removeItem("thesis-survey-part1");
    } catch {
      /* ignore storage failures */
    }
    navigate({ to: "/survey" });
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("thesis-consent", JSON.stringify({ consented: false, at: new Date().toISOString() }));
      localStorage.removeItem("thesis-survey-part1");
    } catch {
      /* ignore storage failures */
    }
    navigate({ to: "/thank-you" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Academic Research Study
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Informed Consent
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Please read the information below before deciding whether to take
            part. Your participation is entirely voluntary.
          </p>
        </header>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* Placeholder consent body */}
          <div className="prose-sm space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              <span className="font-semibold">This is a consent form.</span>{" "}
              The full consent text will be added here before the study goes
              live. It will describe the purpose of the research, what
              participation involves, how your data will be used and stored,
              your right to withdraw, and the researcher's contact details.
            </p>
            <p className="text-muted-foreground">
              <span className="italic">[Full consent form to be inserted here.]</span>
            </p>
          </div>

          <div className="my-7 h-px w-full bg-border" />

          <p className="text-sm font-medium text-foreground">
            By continuing, you confirm that you have read the information
            above and that you are 16 or older.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleDecline}
              className="inline-flex w-full items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent sm:w-auto"
            >
              I do not consent
            </button>
            <button
              type="button"
              onClick={handleConsent}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99] sm:w-auto"
            >
              I do consent
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          Anonymous academic research · No personal identifying data is collected.
        </footer>
      </div>
    </div>
  );
}
