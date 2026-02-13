import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | E-Cell GLA University",
  description:
    "About the Entrepreneurship Cell at GLA University: mission, vision, and team.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <h1 className="text-4xl sm:text-5xl font-bold">About E-Cell</h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        We foster innovation, startup culture, and founder-led initiatives through
        mentorship, events, and resources. Our mission is to empower students to
        explore, encounter, and endeavour.
      </p>
    </div>
  );
}
