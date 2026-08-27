import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/debriefing")({
  head: () => ({
    meta: [
      { title: "Debriefing — Personality & Appearance Spending Study" },
      {
        name: "description",
        content:
          "Debriefing information explaining the purpose and hypotheses of this study on personality traits and appearance-related spending.",
      },
      {
        property: "og:title",
        content: "Debriefing — Personality & Appearance Spending Study",
      },
      {
        property: "og:description",
        content:
          "Debriefing information explaining the purpose and hypotheses of this study on personality traits and appearance-related spending.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DebriefingPage,
});

const SPENDING_AREAS = [
  "Skincare and cosmetics",
  "Clothing and accessories purchased primarily for appearance",
  "Hair treatments and styling",
  "Cosmetic or aesthetic procedures",
  "Fitness and body-composition products",
];

function DebriefingPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Research Debriefing Form
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Thank you for participating!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Thank you for taking the time to complete this study.
          </p>
        </header>

        <article className="space-y-7 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground shadow-sm sm:p-8">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              What was this study about?
            </h2>
            <p>
              The purpose of this study was to investigate the relationship
              between personality traits and appearance-related spending.
            </p>
            <p>
              More specifically, the study examined whether individual
              differences in personality, particularly Neuroticism and
              Conscientiousness, are associated with the amount people spend on
              products and services related to their physical appearance.
            </p>
            <p>Appearance-related spending in this study includes areas such as:</p>
            <ul className="space-y-1.5 border-l-2 border-primary/40 pl-4">
              {SPENDING_AREAS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">{"\n"}</p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              What were the researchers expecting to find?
            </h2>
            <p>The study was based on the following hypotheses:</p>
            <div className="space-y-3">
              <p className="rounded-xl bg-muted p-4">
                <span className="font-semibold">Hypothesis 1:</span> Higher
                levels of Neuroticism will be associated with greater
                appearance-related spending.
              </p>
              <p className="rounded-xl bg-muted p-4">
                <span className="font-semibold">Hypothesis 2:</span> Higher
                levels of Conscientiousness will be associated with
                appearance-related spending, particularly spending related to
                health and fitness.
              </p>
            </div>
            <p className="text-muted-foreground">
              These hypotheses are predictions and are not guaranteed outcomes.
              The collected data will be used to determine whether the predicted
              relationships are supported.
            </p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              Why is this research important?
            </h2>
            <p>
              Appearance-related spending is an important part of everyday
              consumer behaviour. However, the individual characteristics that
              may be associated with differences in this type of spending are
              not fully understood.
            </p>
            <p>
              By examining the relationship between personality traits and
              appearance-related spending, this research may contribute to a
              better understanding of personality psychology and consumer
              behaviour. The results may also help researchers better understand
              why individuals differ in the amount they spend on
              appearance-related products and services.
            </p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              Your participation
            </h2>
            <p>
              Your responses are valuable to this research. By answering the
              questions honestly and to the best of your knowledge, you have
              helped contribute to the data used to investigate these
              relationships.
            </p>
            <p>
              There were no right or wrong answers to the personality or
              spending questions. The study was interested in your genuine
              responses and individual experiences.
            </p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Thank you!</h2>
            <p>
              We sincerely appreciate your time and participation in this
              research.
            </p>
            <p>
              If you have any questions about the study or would like further
              information, please contact:
            </p>
            <p className="font-medium">
              <a
                href="mailto:empirical.psyuw@gmail.com"
                className="underline underline-offset-4 hover:text-primary"
              >
                empirical.psyuw@gmail.com
              </a>
              <br />
              University of Warsaw
              <br />
              Psychology Faculty
            </p>
          </section>
        </article>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Back to start
          </Link>
        </div>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          Anonymous academic research · University of Warsaw
        </footer>
      </div>
    </div>
  );
}
