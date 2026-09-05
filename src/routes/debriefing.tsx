import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

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

function DebriefingPage() {
  const { t, tArr } = useT();

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
            {t("debrief_eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("debrief_title")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("debrief_intro")}
          </p>
        </header>

        <article className="space-y-7 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground shadow-sm sm:p-8">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("debrief_h_about")}
            </h2>
            <p>{t("debrief_about_1")}</p>
            <p>{t("debrief_about_2")}</p>
            <p>{t("debrief_about_3")}</p>
            <ul className="space-y-1.5 border-l-2 border-primary/40 pl-4">
              {tArr("debrief_areas").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">{"\n"}</p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("debrief_h_expect")}
            </h2>
            <p>{t("debrief_expect_intro")}</p>
            <div className="space-y-3">
              <p className="rounded-xl bg-muted p-4">
                <span className="font-semibold">{t("debrief_h1_label")}</span>{" "}
                {t("debrief_h1_text")}
              </p>
              <p className="rounded-xl bg-muted p-4">
                <span className="font-semibold">{t("debrief_h2_label")}</span>{" "}
                {t("debrief_h2_text")}
              </p>
            </div>
            <p className="text-muted-foreground">{t("debrief_expect_note")}</p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("debrief_h_why")}
            </h2>
            <p>{t("debrief_why_1")}</p>
            <p>{t("debrief_why_2")}</p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("debrief_h_you")}
            </h2>
            <p>{t("debrief_you_1")}</p>
            <p>{t("debrief_you_2")}</p>
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">
              {t("debrief_h_thanks")}
            </h2>
            <p>{t("debrief_thanks_1")}</p>
            <p>{t("debrief_thanks_2")}</p>
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
            {t("back_to_start")}
          </Link>
        </div>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          {t("debrief_footer")}
        </footer>
      </div>
    </div>
  );
}
