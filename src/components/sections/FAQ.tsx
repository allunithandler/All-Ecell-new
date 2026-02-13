"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is the Entrepreneurship Cell?",
    answer: "Entrepreneurship Cell is a non-profit student's organization dedicated to promoting the spirit of entrepreneurship among students. Therefore, the E-Cell organises various events related to entrepreneurship."
  },
  {
    question: "What does E-Cell focuses on?",
    answer: "E-Cell focuses on leveraging Entrepreneurship and Innovation. We focus on fostering new ideas and we also help students to grow their network."
  },
  {
    question: "Where is the Entrepreneurship Cell, GLAU situated?",
    answer: "Entrepreneurship Cell, GLAU, is situated at GLA University, Mathura."
  },
  {
    question: "How can i be a part of the E-Cell?",
    answer: "The E-Cell has it's membership drive occasionally. One can register the form to be a member of the E-Cell, GLAU."
  },
  {
    question: "What is the size of the Student Council?",
    answer: "The Student Council consists of 30 students from around the campus."
  },
  {
    question: "How is the E-Cell's environment?",
    answer: "At the E-Cell, we have mentors who have immense experience, students who aid each other to achieve the next level and to rock as a team. New ideas are born at the E-Cell."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // GSAP animations disabled for debugging
  }, []);

  return (
    <section className="py-20" id="faq" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 
          className="section-title text-4xl md:text-5xl font-bold text-center text-white mb-12 uppercase tracking-tight"
        >
          Frequently Asked Questions
        </h2>

        <div className="faq-list max-w-[800px] mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`faq-item bg-[#1a1a1a] rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                openIndex === index ? "border-l-4 border-[#FF6B35]" : "border-l-4 border-transparent"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className="text-lg font-medium text-orange-500 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#FF6B35]" />
                ) : (
                  <Plus className="w-5 h-5 text-neutral-400 group-hover:text-[#FF6B35]" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-neutral-300 leading-relaxed border-t border-neutral-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
