"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";

type EventStatus = "Upcoming" | "Ongoing" | "Past";

interface Event {
  id: string;
  title: string;
  description: string;
  status: EventStatus;
  image: string;
  avatarFallback: string;
}

const eventsData: Event[] = [
  {
    id: "1",
    title: "E-Summit 2025",
    description: "The biggest entrepreneurship summit of the year. Join us for keynote sessions, networking, and startup battles.",
    status: "Upcoming",
    image: "https://placehold.co/400x300/ff6b35/white?text=E-Summit",
    avatarFallback: "ES",
  },
  {
    id: "2",
    title: "Startup Bootcamp",
    description: "A 4-week intensive mentorship program for early-stage student startups to refine their business models.",
    status: "Ongoing",
    image: "https://placehold.co/400x300/22c55e/white?text=Bootcamp",
    avatarFallback: "SB",
  },
  {
    id: "3",
    title: "Ideathon v3.0",
    description: "Over 50 teams competed to solve real-world problems. Winners received seed funding and incubation support.",
    status: "Past",
    image: "https://placehold.co/400x300/64748b/white?text=Ideathon",
    avatarFallback: "ID",
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<EventStatus | "All">("All");

  const filteredEvents = eventsData.filter(
    (event) => filter === "All" || event.status === filter
  );

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Planned <span className="text-orange-500">Events</span>
            </h1>
            <p className="text-neutral-400 text-lg">
              Explore our journey through upcoming, ongoing, and past initiatives.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3 bg-neutral-900/50 p-2 rounded-xl border border-neutral-800 backdrop-blur-sm">
            {(["All", "Upcoming", "Ongoing", "Past"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === status
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10"
            >
              {/* Card Header / Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border backdrop-blur-md ${
                      event.status === "Upcoming"
                        ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                        : event.status === "Ongoing"
                        ? "bg-green-500/20 border-green-500/30 text-green-400"
                        : "bg-neutral-500/20 border-neutral-500/30 text-neutral-400"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-sm shrink-0">
                    {event.avatarFallback}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                </div>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {event.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                  <button className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-700 text-white text-sm font-medium hover:bg-neutral-800 hover:border-neutral-600 transition-colors">
                    View
                  </button>
                  <button className="flex-1 px-4 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-500 border border-neutral-800">
              <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-neutral-400">
              There are no {filter.toLowerCase()} events at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}