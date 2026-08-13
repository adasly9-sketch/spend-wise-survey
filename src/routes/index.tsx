import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Survey — Physical-Appearance Spending Study" },
      {
        name: "description",
        content:
          "Part 1 of an academic research survey on disposable income spending habits related to physical appearance and personal care.",
      },
      { property: "og:title", content: "Survey — Physical-Appearance Spending Study" },
      {
        property: "og:description",
        content:
          "Part 1 of an academic research survey on disposable income spending habits related to physical appearance and personal care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SurveyPage,
});

const SPEND_RANGES = [
  { value: "0", label: "0% — None" },
  { value: "1-5", label: "1–5%" },
  { value: "6-10", label: "6–10%" },
  { value: "11-15", label: "11–15%" },
  { value: "16-25", label: "16–25%" },
  { value: "26-40", label: "26–40%" },
  { value: "41-60", label: "41–60%" },
  { value: "61+", label: "Over 60%" },
] as const;

const EXAMPLE_ITEMS = [
  "Hair trimming & hair care",
  "Makeup",
  "Skincare",
  "Anti-aging products",
  "Fitness & body-composition products",
  "Cosmetics",
  "Clothing",
  "Accessories",
];

function SurveyPage() {
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [spendRange, setSpendRange] = useState<string>("");
  const [career, setCareer] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const ageNum = Number(age);
  const ageValid = age !== "" && Number.isInteger(ageNum) && ageNum >= 16 && ageNum <= 100;
  const spendValid = spendRange !== "";
  const careerValid = career.trim().length >= 2;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!ageValid) next.age = "Please enter a whole number between 16 and 100.";
    if (!spendValid) next.spendRange = "Please select an estimated range.";
    if (!careerValid) next.career = "Please describe your current occupation or field.";
    setErrors(next);
    setTouched({ age: true, spendRange: true, career: true });
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      age: ageNum,
      spendRange,
      career: career.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("thesis-survey-part1", JSON.stringify(payload));
    } catch {
      /* ignore storage failures */
    }

    navigate({ to: "/questionnaire" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Academic Research Survey
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Spending on Physical Appearance
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Part 1 of 2. Your answers are anonymous and used solely for academic
            research. This short survey takes about 2 minutes.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex h-6 items-center rounded-full bg-primary px-3 text-primary-foreground">
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
          {/* Q1 — Age */}
          <Field
            number={1}
            label="What is your age?"
            hint="Enter your age in years."
            error={touched.age ? errors.age : undefined}
          >
            <input
              type="number"
              inputMode="numeric"
              min={16}
              max={100}
              step={1}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, age: true }))}
              placeholder="e.g. 24"
              className="w-full max-w-[12rem] rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          <Divider />

          {/* Q2 — Spending estimate */}
          <Field
            number={2}
            label="Roughly what share of your disposable income do you spend on physical-appearance-related purchases?"
            hint="Pick the range that best fits your typical monthly or yearly spending. Disposable income means the money left after essential bills (rent, food, utilities)."
            error={touched.spendRange ? errors.spendRange : undefined}
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SPEND_RANGES.map((opt) => {
                const selected = spendRange === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSpendRange(opt.value);
                      setTouched((t) => ({ ...t, spendRange: true }));
                    }}
                    aria-pressed={selected}
                    className={
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition " +
                      (selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-ring hover:bg-accent")
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="mt-4 rounded-xl bg-muted/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              These purchases include, for example:
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {EXAMPLE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Think about recurring and occasional spending together — not a single
              month, but your typical pattern over a year.
            </p>
          </div>

          <Divider />

          {/* Q3 — Career */}
          <Field
            number={3}
            label="What is your current career or occupation?"
            hint="Describe your job title, field, or professional area (e.g. “marketing manager”, “student”, “teacher”, “nurse”, “self-employed designer”)."
            error={touched.career ? errors.career : undefined}
          >
            <input
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, career: true }))}
              placeholder="e.g. software developer"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          {/* Next */}
          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              You can review your answers before continuing.
            </p>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99] sm:w-auto"
            >
              Next: Questionnaire
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

function Field({
  number,
  label,
  hint,
  error,
  children,
}: {
  number: number;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {number}
        </span>
        <div className="min-w-0">
          <label className="block text-base font-semibold leading-snug text-foreground">
            {label}
          </label>
          {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
      </div>
      <div className="mt-3 pl-10">{children}</div>
      {error ? (
        <p className="mt-2 pl-10 text-sm font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  );
}

function Divider() {
  return <div className="my-7 h-px w-full bg-border" />;
}
