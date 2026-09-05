import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Research Consent Form — Personality & Everyday Behaviour Study" },
      {
        name: "description",
        content:
          "Informed consent for an anonymous University of Warsaw study on individual differences in psychological characteristics and everyday behaviours.",
      },
      {
        property: "og:title",
        content: "Research Consent Form — Personality & Everyday Behaviour Study",
      },
      {
        property: "og:description",
        content:
          "Informed consent for an anonymous University of Warsaw study on individual differences in psychological characteristics and everyday behaviours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsentPage,
});

function ConsentPage() {
  const navigate = useNavigate();
  const { t, tArr } = useT();

  const handleConsent = () => {
    try {
      localStorage.setItem(
        "thesis-consent",
        JSON.stringify({ consented: true, at: new Date().toISOString() }),
      );
      localStorage.removeItem("thesis-survey-part1");
    } catch {
      /* ignore storage failures */
    }
    navigate({ to: "/survey" });
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(
        "thesis-consent",
        JSON.stringify({ consented: false, at: new Date().toISOString() }),
      );
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
            {t("consent_eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("consent_title")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("consent_intro")}
          </p>
        </header>

        <article className="space-y-7 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground shadow-sm sm:p-8">
          <Section title={t("consent_h_purpose")}>
            <p>{t("consent_purpose_1")}</p>
            <p>{t("consent_purpose_2")}</p>
          </Section>

          <Section title={t("consent_h_involve")}>
            <p>{t("consent_involve_1")}</p>
            <p>{t("consent_involve_2")}</p>
            <p>{t("consent_involve_3")}</p>
          </Section>

          <Section title={t("consent_h_important")}>
            <p>{t("consent_important_1")}</p>
            <p>{t("consent_important_2")}</p>
          </Section>

          <Section title={t("consent_h_privacy")}>
            <p>{t("consent_privacy_1")}</p>
            <p>{t("consent_privacy_2")}</p>
          </Section>

          <Section title={t("consent_h_risks")}>
            <p>{t("consent_risks_1")}</p>
            <p>{t("consent_risks_2")}</p>
          </Section>

          <Section title={t("consent_h_contact")}>
            <p>
              {t("consent_contact_prefix")}{" "}
              <a
                href="mailto:empirical.psyuw@gmail.com"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                empirical.psyuw@gmail.com
              </a>
              <br />
              University of Warsaw
            </p>
          </Section>

          <div className="h-px w-full bg-border" />

          <Section title={t("consent_h_consent")}>
            <p>{t("consent_confirm")}</p>
            <ul className="space-y-2 border-l-2 border-primary/40 pl-4">
              {tArr("consent_points").map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Section>

          <div>
            <p className="text-sm font-semibold text-foreground">
              {t("consent_select_one")}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleConsent}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99]"
              >
                {t("consent_yes")}
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
              <button
                type="button"
                onClick={handleDecline}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-input bg-background px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                {t("consent_no")}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t("consent_yes_hint")}
            </p>
          </div>
        </article>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          {"\n"}
        </footer>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
