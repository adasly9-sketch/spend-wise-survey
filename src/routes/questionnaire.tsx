import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BIG5_ITEMS,
  LIKERT_OPTIONS,
  computeScores,
  type Answers,
} from "@/lib/big5";

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

interface Part1Payload {
  age: number;
  gender: string;
  nationality: string;
  spendRange: string;
  career: string;
  email: string | null;
}

function QuestionnairePage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = BIG5_ITEMS.length;
  const item = BIG5_ITEMS[index] ?? BIG5_ITEMS[0]!;
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[item.id];
  const isLast = index === total - 1;
  const progress = Math.round((answeredCount / total) * 100);

  const select = (value: number) => {
    setAnswers((a) => ({ ...a, [item.id]: value }));
    setError(null);
  };

  const goNext = () => {
    if (currentAnswer === undefined) return;
    if (!isLast) setIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    if (answeredCount < total) {
      setError("Please answer every question before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);

    let part1: Part1Payload | null = null;
    try {
      const raw = localStorage.getItem("thesis-survey-part1");
      if (raw) part1 = JSON.parse(raw) as Part1Payload;
    } catch {
      /* ignore */
    }

    const scores = computeScores(answers);

    const { error: insertError } = await supabase.from("survey_responses").insert({
      age: part1?.age ?? null,
      gender: part1?.gender ?? null,
      nationality: part1?.nationality ?? null,
      spend_range: part1?.spendRange ?? null,
      career: part1?.career ?? null,
      email: part1?.email ?? null,
      answers,
      scores: scores as unknown as Record<string, number>,
    });

    if (insertError) {
      setSubmitting(false);
      setError("Something went wrong while saving your answers. Please try again.");
      return;
    }

    try {
      localStorage.removeItem("thesis-survey-part1");
    } catch {
      /* ignore */
    }

    navigate({ to: "/debriefing" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-6 text-center">
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
            Part 2 of the study. Read each statement and choose how much you
            agree or disagree. There are no right or wrong answers — answer
            honestly and go with your first impression.
          </p>
        </header>

        {/* Progress bar */}
        <div className="sticky top-0 z-10 -mx-4 bg-background/90 px-4 py-3 backdrop-blur">
          <div className="mx-auto max-w-2xl">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>
                Question {index + 1} of {total}
              </span>
              <span>{progress}% complete</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Questionnaire progress"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <p
            key={item.id}
            className="min-h-[3.5rem] text-center text-xl font-semibold leading-snug text-foreground sm:text-2xl"
          >
            {item.text}
          </p>

          <div
            className="mt-6 flex flex-col gap-2"
            role="radiogroup"
            aria-label={`Question ${index + 1}`}
          >
            {LIKERT_OPTIONS.map((opt) => {
              const selected = currentAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => select(opt.value)}
                  className={
                    "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition active:scale-[0.99] sm:text-center " +
                    (selected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-ring hover:bg-accent")
                  }
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold opacity-70">
                    {opt.value}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {error ? (
            <p className="mt-4 text-center text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
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
              Previous
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || answeredCount < total}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit answers"}
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={currentAnswer === undefined}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
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
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You must answer every question before you can submit.{" "}
          <Link to="/survey" className="underline underline-offset-2 hover:text-foreground">
            Back to survey
          </Link>
        </p>
      </div>
    </div>
  );
}
