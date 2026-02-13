import type { Metadata } from "next";
import CalendarView from "@/components/sections/CalendarView";

export const metadata: Metadata = {
  title: "Calendar | E-Cell GLA University",
  description: "Schedule of upcoming, ongoing, and past events.",
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-transparent pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CalendarView />
      </div>
    </div>
  );
}
