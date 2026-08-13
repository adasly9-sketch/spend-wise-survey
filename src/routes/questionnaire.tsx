import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "Questionnaire — Physical-Appearance Spending Study" },
      {
        name: "description",
        content:
          "Part 2 of the academic research survey: a detailed questionnaire on physical-appearance-related spending.",
      },
      { property: "og:title", content: "Questionnaire — Physical-Appearance Spending Study" },
      {
        property: "og:description",
        content:
          "Part 2 of the academic research survey: a detailed questionnaire on physical-appearance-related spending.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuestionnairePage,
});

function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex h-6 items-center rounded-full border border-border px-3">
            1 · Survey
          </span>
          <span aria-hidden>›</span>
          <span className="inline-flex h-6 items-center rounded-full bg-primary px-3 text-primary-foreground">
            2 · Questionnaire
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Questionnaire
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is Part 2 of the study. Your survey answers from Part 1 have been
          saved. The detailed questionnaire questions will appear here.
        </p>
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8">
          <p className="text-sm text-muted-foreground">
            Questionnaire content is coming next. Tell me the questions you'd like
            here and I'll build them.
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/survey"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
          >
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
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to survey
          </Link>
        </div>
      </div>
    </div>
  );
}
