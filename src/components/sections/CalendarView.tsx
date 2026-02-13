"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List as ListIcon, Check } from "lucide-react";

// --- Types ---
type EventCategory = "Workshop" | "Mentorship" | "Competition" | "Speaker Session" | "Networking";
type ViewMode = "Month" | "List";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  category: EventCategory;
}

// --- Dummy Data ---
const CATEGORIES: { name: EventCategory; color: string; bg: string; border: string }[] = [
  { name: "Workshop", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" },
  { name: "Mentorship", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30" },
  { name: "Competition", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  { name: "Speaker Session", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { name: "Networking", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
];

const generateDummyEvents = (): CalendarEvent[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  return [
    { id: "1", title: "Idea Validation Workshop", date: new Date(year, month, 5), category: "Workshop" },
    { id: "2", title: "Mentor Connect: Tech", date: new Date(year, month, 8), category: "Mentorship" },
    { id: "3", title: "Pitch Perfect Competition", date: new Date(year, month, 12), category: "Competition" },
    { id: "4", title: "Founder Talk: Zero to One", date: new Date(year, month, 15), category: "Speaker Session" },
    { id: "5", title: "Networking Night", date: new Date(year, month, 20), category: "Networking" },
    { id: "6", title: "Design Thinking Sprint", date: new Date(year, month, 25), category: "Workshop" },
    { id: "7", title: "Hackathon 2025 Kickoff", date: new Date(year, month, 28), category: "Competition" },
    // Next month preview
    { id: "8", title: "Investor Meetup", date: new Date(year, month + 1, 2), category: "Networking" },
  ];
};

const EVENTS = generateDummyEvents();

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewMode>("Month");
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(CATEGORIES.map(c => c.name));

  // --- Helpers ---
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const toggleCategory = (category: EventCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const selectAllCategories = () => {
    if (selectedCategories.length === CATEGORIES.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(CATEGORIES.map(c => c.name));
    }
  };

  // --- Render ---
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  // Filter events for the current month view
  const eventsInMonth = EVENTS.filter(e => 
    e.date.getMonth() === currentDate.getMonth() && 
    e.date.getFullYear() === currentDate.getFullYear() &&
    selectedCategories.includes(e.category)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* --- Sidebar --- */}
      <div className="w-full lg:w-80 shrink-0 space-y-8">
        {/* Title Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">E-Cell Calendar</h2>
          <p className="text-neutral-500 text-sm">GLA University</p>
          
          {/* View Toggles */}
          <div className="flex bg-neutral-950 p-1 rounded-lg mt-6 border border-neutral-800">
            <button
              onClick={() => setView("Month")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                view === "Month" ? "bg-orange-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"
              }`}
            >
              <CalendarIcon size={16} /> Month
            </button>
            <button
              onClick={() => setView("List")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                view === "List" ? "bg-orange-600 text-white shadow-lg" : "text-neutral-400 hover:text-white"
              }`}
            >
              <ListIcon size={16} /> List
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Event Categories</h3>
            <button 
              onClick={selectAllCategories}
              className="text-xs text-orange-500 hover:text-orange-400 transition-colors"
            >
              {selectedCategories.length === CATEGORIES.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  selectedCategories.includes(cat.name)
                    ? `${cat.bg} ${cat.border} shadow-sm`
                    : "bg-neutral-950 border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${cat.color.replace("text-", "bg-")}`} />
                <span className={`text-sm font-medium ${selectedCategories.includes(cat.name) ? "text-white" : "text-neutral-400"}`}>
                  {cat.name}
                </span>
                {selectedCategories.includes(cat.name) && (
                  <Check size={14} className={`ml-auto ${cat.color}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming List (Mini) */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {EVENTS.slice(0, 3).map(event => (
              <div key={event.id} className="flex gap-3 items-start group">
                <div className="w-12 h-12 bg-neutral-950 rounded-lg flex flex-col items-center justify-center border border-neutral-800 group-hover:border-orange-500/50 transition-colors">
                  <span className="text-xs text-neutral-500 uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg font-bold text-white">{event.date.getDate()}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white group-hover:text-orange-500 transition-colors line-clamp-1">{event.title}</h4>
                  <span className="text-xs text-neutral-500">{event.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Main Calendar Area --- */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 min-h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrevMonth}
              className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white hover:border-orange-500 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {currentMonthName} <span className="text-orange-500">{currentYear}</span>
            </h2>
            <button 
              onClick={handleNextMonth}
              className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white hover:border-orange-500 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="hidden sm:block px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-sm font-semibold hover:bg-indigo-600/30 transition-all"
          >
            Current Month
          </button>
        </div>

        {/* Calendar Grid */}
        {view === "Month" ? (
          <div className="flex-1">
            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-neutral-500 text-sm font-medium uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 grid-rows-5 gap-2 h-full min-h-[500px]">
              {/* Empty cells for prev month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-transparent" />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = eventsInMonth.filter(e => e.date.getDate() === day);
                const isToday = 
                  day === new Date().getDate() && 
                  currentDate.getMonth() === new Date().getMonth() && 
                  currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div 
                    key={day} 
                    className={`relative bg-neutral-950 border ${isToday ? 'border-orange-500 shadow-[0_0_10px_rgba(255,107,53,0.2)]' : 'border-neutral-800'} rounded-xl p-2 transition-all hover:border-neutral-600 group flex flex-col`}
                  >
                    <span className={`text-sm font-bold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-orange-500 text-white' : 'text-neutral-400'}`}>
                      {day}
                    </span>
                    
                    {/* Event dots/bars */}
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                      {dayEvents.map((event, idx) => {
                        const catStyle = CATEGORIES.find(c => c.name === event.category);
                        return (
                          <div 
                            key={idx}
                            className={`text-[10px] px-1.5 py-0.5 rounded truncate border ${catStyle?.bg} ${catStyle?.border} ${catStyle?.color} font-medium`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
             {eventsInMonth.length > 0 ? (
               eventsInMonth.sort((a, b) => a.date.getDate() - b.date.getDate()).map(event => {
                const catStyle = CATEGORIES.find(c => c.name === event.category);
                return (
                  <div key={event.id} className="flex items-center gap-6 p-4 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-orange-500/30 transition-all">
                     <div className="text-center w-16 shrink-0">
                       <div className="text-2xl font-bold text-white">{event.date.getDate()}</div>
                       <div className="text-xs text-neutral-500 uppercase">{currentMonthName}</div>
                     </div>
                     <div className="w-1 h-10 bg-neutral-800 rounded-full" />
                     <div className="flex-1">
                       <h4 className="text-lg font-bold text-white mb-1">{event.title}</h4>
                       <span className={`text-xs px-2 py-0.5 rounded border ${catStyle?.bg} ${catStyle?.border} ${catStyle?.color}`}>
                         {event.category}
                       </span>
                     </div>
                     <button className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                       Details
                     </button>
                  </div>
                )
               })
             ) : (
               <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                 <p>No events scheduled for this month.</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
