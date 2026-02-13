import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact | E-Cell GLA University",
  description: "Get in touch with the Entrepreneurship Cell of GLA University.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Contact</h1>
        <p className="mt-2 text-neutral-400">GLA University, Mathura — ecell@gla.ac.in</p>
        <ContactForm />
      </div>
    </div>
  );
}