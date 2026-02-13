import type { Metadata } from "next";
import Team from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Our Team | E-Cell GLA University",
  description: "Meet the team behind E-Cell GLA University.",
};

export default function TeamPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
        <Team />
      </div>
    </div>
  );
}
