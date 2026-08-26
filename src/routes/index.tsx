import { createFileRoute, useNavigate } from "@tanstack/react-router";

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

const CONSENT_POINTS = [
  "I have read and understood the information provided above.",
  "I understand that participation is voluntary.",
  "I understand that I may withdraw from the study without penalty, subject to the point at which my data have been anonymised.",
  "I understand what participation in the study involves.",
  "I agree to answer all questions honestly and to the best of my knowledge.",
  "I understand that there are no right or wrong answers.",
  "I understand that the specific research relationships being investigated will be explained to me after completing the study.",
  "I freely agree to participate in this research.",
];

function ConsentPage() {
  const navigate = useNavigate();

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
            University of Warsaw · Psychology Faculty
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Research Consent Form
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Please read the following information carefully before proceeding.
          </p>
        </header>

        <article className="space-y-7 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground shadow-sm sm:p-8">
          <Section title="What is the purpose of this study?">
            <p>
              The purpose of this research is to investigate individual
              differences in psychological characteristics and everyday
              behaviours. The study aims to explore whether certain individual
              characteristics are associated with differences in people's
              everyday choices, experiences, and behaviours.
            </p>
            <p>
              To avoid influencing participants' responses, the specific
              relationships being investigated will not be described in detail
              before participation. A full explanation of the research purpose
              and hypotheses will be provided in the debriefing information at
              the end of the study.
            </p>
          </Section>

          <Section title="What does your participation involve?">
            <p>
              Your participation involves completing an online questionnaire
              that will take approximately 15 minutes to complete.
            </p>
            <p>
              You will be asked questions about your personality, everyday
              behaviours, spending habits, and some basic demographic
              information such as age, gender, and income range.
            </p>
            <p>
              Participation in this study is completely voluntary. If you decide
              not to participate, there will be no negative consequences. If you
              choose to participate, you may withdraw from the study at any time
              without penalty and without having to provide a reason, subject to
              the point at which your data have been anonymised.
            </p>
          </Section>

          <Section title="Why is your participation important?">
            <p>
              Every participant's response is valuable. Your participation will
              help us collect data and examine patterns between psychological
              characteristics and everyday behaviour. The information collected
              from participants will contribute to a better understanding of
              individual differences and behavioural patterns.
            </p>
            <p>
              Because this research relies on participants' individual
              responses, it is particularly important that you answer all
              questions honestly and to the best of your knowledge. There are no
              right or wrong answers to the questions in this study. Honest
              responses will help ensure that the results are as reliable and
              meaningful as possible.
            </p>
          </Section>

          <Section title="How will your personal information be kept?">
            <p>
              Your participation will be confidential and your responses will be
              treated as anonymous. No personally identifiable information will
              be collected as part of the study. The data will be analysed
              collectively, meaning that individual participants will not be
              identified in the research results.
            </p>
            <p>
              The research data will be stored securely and access will be
              restricted to the research team. Data will be handled in
              accordance with applicable data protection requirements, including
              GDPR regulations in Poland.
            </p>
          </Section>

          <Section title="Are there any possible risks?">
            <p>
              This study is considered to involve low risk. Some questions may
              ask you to reflect on personal characteristics, behaviours, or
              spending habits, which may cause mild discomfort for some
              participants. You may discontinue participation if you become
              uncomfortable.
            </p>
            <p>
              A full debriefing explaining the purpose of the research and what
              the study was specifically investigating will be provided after
              you complete the questionnaire.
            </p>
          </Section>

          <Section title="Contact information">
            <p>
              If you have any questions about this study, please contact:{" "}
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

          <Section title="Consent">
            <p>
              By selecting “YES – I give consent”, I confirm that:
            </p>
            <ul className="space-y-2 border-l-2 border-primary/40 pl-4">
              {CONSENT_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Section>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Please select one:
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleConsent}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99]"
              >
                YES — I give my consent to participate
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
                NO — I do not agree to participate
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Selecting YES confirms you have read and understood the
              information above, agree to these terms, and will answer the
              questions honestly and to the best of your knowledge.
            </p>
          </div>
        </article>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          Anonymous academic research · No personal identifying data is collected.
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
