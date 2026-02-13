import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initiatives | E-Cell GLA University",
  description: "Incubation, mentorship, competitions, and startup showcases.",
};

export default function InitiativesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-4xl sm:text-5xl font-bold">Initiatives</h1>
      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold">Mentorship</h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">Guided sessions with founders and operators.</p>
        </div>
        <div className="p-6 rounded border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold">Incubation</h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">Support for early-stage student startups.</p>
        </div>
        <div className="p-6 rounded border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold">Competitions</h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">Pitch battles and ideation sprints.</p>
        </div>
        <div className="p-6 rounded border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold">Showcases</h3>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">Highlight student projects and startups.</p>
        </div>
      </div>
    </div>
  );
}