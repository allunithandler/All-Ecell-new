import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | E-Cell GLA University",
  description: "Playbooks, talks, articles for founders and builders.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-4xl sm:text-5xl font-bold">Resources</h1>
      <ul className="mt-6 space-y-4">
        <li className="p-5 rounded border border-neutral-200 dark:border-neutral-800">
          Founder Talks — insights from operators and alumni.
        </li>
        <li className="p-5 rounded border border-neutral-200 dark:border-neutral-800">
          Weekly Newsletter — curated links and opportunities.
        </li>
        <li className="p-5 rounded border border-neutral-200 dark:border-neutral-800">
          Playbooks — GTM, product, fundraising basics.
        </li>
      </ul>
    </div>
  );
}