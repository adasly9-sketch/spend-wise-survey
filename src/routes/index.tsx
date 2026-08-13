import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Consent — Physical-Appearance Spending Study" },
      {
        name: "description",
        content: "This is a consent form for the academic research study on physical-appearance-related spending. Please read and agree to continue.",
      },
      { property: "og:title", content: "Consent — Physical-Appearance Spending Study" },
      {
        property: "og:description",
        content: "This is a consent form for the academic research study on physical-appearance-related spending. Please read and agree to continue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setTouched(true);
      return;
    }
    navigate({ to: "/survey" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Academic Research Study
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Informed Consent
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This is a consent form. Please review the information below before
            continuing to the survey.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex h-6 items-center rounded-full bg-primary px-3 text-primary-foreground">
              0 · Consent
            </span>
            <span aria-hidden>›</span>
            <span className="inline-flex h-6 items-center rounded-full border border-border px-3">
              1 · Survey
            </span>
            <span aria-hidden>›</span>
            <span className="inline-flex h-6 items-center rounded-full border border-border px-3">
              2 · Questionnaire
            </span>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          {/* Placeholder consent body */}
          <div className="rounded-xl border border-dashed border-border bg-background p-6">
            <p className="text-sm font-medium text-muted-foreground">
              [ The full consent form text will be added here. ]
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              This is a consent form describing the purpose, procedures, risks,
              benefits, confidentiality, and your rights as a participant in this
              academic research study. By continuing, you acknowledge that you
              have read and understood the information provided.
            </p>
          </div>

          {/* Agreement checkbox */}
          <div className="mt-6">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-4 transition hover:border-ring">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                onBlur={() => setTouched(true)}
                className="mt-0.5 h-5 w-5 flex-none cursor-pointer accent-primary"
              />
              <span className="text-sm leading-relaxed text-foreground">
                I have read the consent information and I agree to participate in
                this study. I understand my participation is voluntary and I may
                withdraw at any time.
              </span>
            </label>
            {touched && !agreed ? (
              <p className="mt-2 text-sm font-medium text-destructive">
                Please check the box to confirm your consent before continuing.
              </p>
            ) : null}
          </div>

          {/* Continue */}
          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              You must consent to proceed to the survey.
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99] sm:w-auto"
            >
              Continue to survey
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
        </form>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          Anonymous academic research · No personal identifying data is collected.
        </footer>
      </div>
    </div>
  );
}
