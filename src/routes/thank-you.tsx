import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Physical-Appearance Spending Study" },
      {
        name: "description",
        content:
          "Thank you for your response. No data has been collected from you.",
      },
      {
        property: "og:title",
        content: "Thank You — Physical-Appearance Spending Study",
      },
      {
        property: "og:description",
        content:
          "Thank you for your response. No data has been collected from you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const [declined, setDeclined] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("thesis-consent");
      if (raw) {
        const parsed = JSON.parse(raw);
        setDeclined(parsed.consented === false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Thank you
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {declined
            ? "You chose not to take part. No data has been collected from you, and none will be stored."
            : "Thank you for your time. No data has been collected from you."}
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Back to start
          </Link>
        </div>
      </div>
    </div>
  );
}
