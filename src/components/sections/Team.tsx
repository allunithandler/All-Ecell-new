"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

type Member = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
};

const councils: Record<string, Member[]> = {
  "1.0": [
    { name: "Aayush Singhal", role: "Member", photo: "/images/StudentCouncil/1.0/Aayush Singhal-01.png" },
    { name: "Amit Mishra", role: "Member", photo: "/images/StudentCouncil/1.0/Amit Mishra-01.png" },
    { name: "Anindya Singh", role: "Member", photo: "/images/StudentCouncil/1.0/Anindya Singh-01.png" },
    { name: "Dhruv Dhingra", role: "Member", photo: "/images/StudentCouncil/1.0/Dhruv Dhingra-01.png" },
    { name: "Mohit Divyansh Tripathi", role: "Member", photo: "/images/StudentCouncil/1.0/Mohit Divyansh Tripathi-01.png" },
    { name: "Prankur Chaturvedi", role: "Member", photo: "/images/StudentCouncil/1.0/Prankur Chaturvedi-01.png" },
    { name: "Ravi Shankar Dubey", role: "Member", photo: "/images/StudentCouncil/1.0/Ravi Shankar Dubey-01.png" },
    { name: "Siddhant Agrawal", role: "Member", photo: "/images/StudentCouncil/1.0/Siddhant Agrawal-01.png" },
  ],
  "2.0": [
    { name: "Akansha Verma", role: "Member", photo: "/images/StudentCouncil/2.0/Akansha Verma-01.png" },
    { name: "Akshay Srivastava", role: "Member", photo: "/images/StudentCouncil/2.0/Akshay Srivastava-01.png" },
    { name: "Amit Mishra", role: "Member", photo: "/images/StudentCouncil/2.0/Amit Mishra-01.png" },
    { name: "Anindya Singh", role: "Member", photo: "/images/StudentCouncil/2.0/Anindya Singh-01.png" },
    { name: "Bhavya Hardasani", role: "Member", photo: "/images/StudentCouncil/2.0/Bhavya Hardasani-01.png" },
    { name: "Jay Kattyayan", role: "Member", photo: "/images/StudentCouncil/2.0/Jay Kattyayan-01.png" },
    { name: "Karan Bhardwaj", role: "Member", photo: "/images/StudentCouncil/2.0/Karan Bhardwaj-01.png" },
    { name: "Parth Dutt", role: "Member", photo: "/images/StudentCouncil/2.0/Parth Dutt-01.png" },
    { name: "Prankur Chaturvedi", role: "Member", photo: "/images/StudentCouncil/2.0/Prankur Chaturvedi-01.png" },
    { name: "Siddhartha Bajpai", role: "Member", photo: "/images/StudentCouncil/2.0/Siddhartha Bajpai-01.png" },
  ],
  "3.0": [
    { name: "Ashay Vishnoi", role: "Member", photo: "/images/StudentCouncil/3.0/Ashay Vishnoi-01.png" },
    { name: "Mritunjay Singh", role: "Member", photo: "/images/StudentCouncil/3.0/Mritunjay Singh-01.png" },
    { name: "Nirmal Kumar", role: "Member", photo: "/images/StudentCouncil/3.0/Nirmal Kumar-01.png" },
    { name: "Pranao Sinha", role: "Member", photo: "/images/StudentCouncil/3.0/Pranao Sinha-01.png" },
    { name: "Prashun Dalmia", role: "Member", photo: "/images/StudentCouncil/3.0/Prashun Dalmia-01.png" },
    { name: "Rishabh Srivastava", role: "Member", photo: "/images/StudentCouncil/3.0/Rishabh Srivastava-01.png" },
    { name: "Sagar Gupta", role: "Member", photo: "/images/StudentCouncil/3.0/Sagar Gupta-01.png" },
    { name: "Sharad Pal", role: "Member", photo: "/images/StudentCouncil/3.0/Sharad Pal-01.png" },
    { name: "Shivam Tureha", role: "Member", photo: "/images/StudentCouncil/3.0/Shivam Tureha-01.png" },
    { name: "Siddhartha Bajpai", role: "Member", photo: "/images/StudentCouncil/3.0/Siddhartha Bajpai-01.png" },
  ],
  "4.0": [
    { name: "Ashay Vishnoi", role: "Member", photo: "/images/StudentCouncil/4.0/Ashay Vishnoi-01.png" },
    { name: "Krishan Agrawal", role: "Member", photo: "/images/StudentCouncil/4.0/Krishan Agrawal-01.png" },
    { name: "Nakul Kaushal", role: "Member", photo: "/images/StudentCouncil/4.0/Nakul Kaushal-01.png" },
    { name: "Nihit Jain", role: "Member", photo: "/images/StudentCouncil/4.0/Nihit Jain-01.png" },
    { name: "Nilesh Singh", role: "Member", photo: "/images/StudentCouncil/4.0/Nilesh Singh-01.png" },
    { name: "Sagar Gupta", role: "Member", photo: "/images/StudentCouncil/4.0/Sagar Gupta-01.png" },
    { name: "Shubham Ratani", role: "Member", photo: "/images/StudentCouncil/4.0/Shubham Ratani-01.png" },
  ],
  "5.0": [
    { name: "Adesh Chauhan", role: "Member", photo: "/images/StudentCouncil/5.0/Adesh Chauhan-01.png" },
    { name: "Animesh Raghuvanshi", role: "Member", photo: "/images/StudentCouncil/5.0/Animesh Raghuvanshi-01.png" },
    { name: "Ayush Gupta", role: "Member", photo: "/images/StudentCouncil/5.0/Ayush Gupta-01.png" },
    { name: "Gitansh Sehgal", role: "Member", photo: "/images/StudentCouncil/5.0/Gitansh Sehgal-01.png" },
    { name: "Jai Narayan Jain", role: "Member", photo: "/images/StudentCouncil/5.0/Jai Narayan Jain-01.png" },
    { name: "Kashish Sahu", role: "Member", photo: "/images/StudentCouncil/5.0/Kashish Sahu-01.png" },
    { name: "Mayank Gupta", role: "Member", photo: "/images/StudentCouncil/5.0/Mayank Gupta-01.png" },
    { name: "Riya Narain", role: "Member", photo: "/images/StudentCouncil/5.0/Riya Narain-01.png" },
    { name: "Sankalp Chaturvedi", role: "Member", photo: "/images/StudentCouncil/5.0/Sankalp Chaturvedi-01.png" },
    { name: "Shubhangi Singh", role: "Member", photo: "/images/StudentCouncil/5.0/Shubhangi Singh-01.png" },
    { name: "Vishesh Agarwal", role: "Member", photo: "/images/StudentCouncil/5.0/Vishesh Agarwal-01.png" },
  ],
  "6.0": [
    { name: "Abhishek Chaubey", role: "Member", photo: "/images/StudentCouncil/6.0/Abhishek Chaubey-01.png" },
    { name: "Akhil", role: "Member", photo: "/images/StudentCouncil/6.0/Akhil-01.png" },
    { name: "Alok", role: "Member", photo: "/images/StudentCouncil/6.0/Alok-01.png" },
    { name: "Aman", role: "Member", photo: "/images/StudentCouncil/6.0/Aman-01.png" },
    { name: "Anurag", role: "Member", photo: "/images/StudentCouncil/6.0/Anurag-01.png" },
    { name: "Ashish", role: "Member", photo: "/images/StudentCouncil/6.0/Ashish.png" },
    { name: "Ayush", role: "Member", photo: "/images/StudentCouncil/6.0/Ayush-01.png" },
    { name: "Bhumika", role: "Member", photo: "/images/StudentCouncil/6.0/Bhumika.png" },
    { name: "Deeksha Badhauria", role: "Member", photo: "/images/StudentCouncil/6.0/Deeksha Badhauria-01.png" },
    { name: "Deeksha", role: "Member", photo: "/images/StudentCouncil/6.0/Deeksha-01.png" },
    { name: "Devansh", role: "Member", photo: "/images/StudentCouncil/6.0/Devansh-01.png" },
    { name: "Gaurang", role: "Member", photo: "/images/StudentCouncil/6.0/Gaurang-01.png" },
    { name: "Jaideep", role: "Member", photo: "/images/StudentCouncil/6.0/Jaideep-01.png" },
    { name: "Mayank", role: "Member", photo: "/images/StudentCouncil/6.0/Mayank-01.png" },
    { name: "Naman", role: "Member", photo: "/images/StudentCouncil/6.0/Naman-01.png" },
    { name: "Niharika", role: "Member", photo: "/images/StudentCouncil/6.0/Niharika-01.png" },
    { name: "Pawan", role: "Member", photo: "/images/StudentCouncil/6.0/Pawan-01.png" },
    { name: "Rudra Pratap", role: "Member", photo: "/images/StudentCouncil/6.0/Rudra Pratap-01.png" },
    { name: "Shailja", role: "Member", photo: "/images/StudentCouncil/6.0/Shailja-01.png" },
    { name: "Shipra", role: "Member", photo: "/images/StudentCouncil/6.0/Shipra-01.png" },
    { name: "Shiv", role: "Member", photo: "/images/StudentCouncil/6.0/Shiv-01.png" },
    { name: "Shivansh", role: "Member", photo: "/images/StudentCouncil/6.0/Shivansh-01.png" },
    { name: "Sristhi", role: "Member", photo: "/images/StudentCouncil/6.0/Sristhi-01.png" },
    { name: "Utkarsh", role: "Member", photo: "/images/StudentCouncil/6.0/Utkarsh-01.png" },
    { name: "Varzika", role: "Member", photo: "/images/StudentCouncil/6.0/Varzika-01.png" },
    { name: "Veer", role: "Member", photo: "/images/StudentCouncil/6.0/Veer-01.png" },
    { name: "Yashasvi", role: "Member", photo: "/images/StudentCouncil/6.0/Yashasvi-01.png" },
  ],
  "7.0": [
    { name: "Abhishek", role: "Member", photo: "/images/StudentCouncil/7.0/Abhishek-01.png" },
    { name: "Akhil", role: "Member", photo: "/images/StudentCouncil/7.0/Akhil-01.png" },
    { name: "Alok", role: "Member", photo: "/images/StudentCouncil/7.0/Alok-01.png" },
    { name: "Anushka Chauhan", role: "Member", photo: "/images/StudentCouncil/7.0/Anushka chauhan.png" },
    { name: "Aryan", role: "Member", photo: "/images/StudentCouncil/7.0/Aryan-01.png" },
    { name: "Aryan", role: "Member", photo: "/images/StudentCouncil/7.0/Aryan.png" },
    { name: "Ayushi", role: "Member", photo: "/images/StudentCouncil/7.0/Ayushi-01.png" },
    { name: "Devdutt", role: "Member", photo: "/images/StudentCouncil/7.0/Devdutt.png" },
    { name: "Gaurang", role: "Member", photo: "/images/StudentCouncil/7.0/Gaurang-01.png" },
    { name: "Harsh", role: "Member", photo: "/images/StudentCouncil/7.0/Harsh-01.png" },
    { name: "Ishan", role: "Member", photo: "/images/StudentCouncil/7.0/Ishan-01.png" },
    { name: "Keshav", role: "Member", photo: "/images/StudentCouncil/7.0/Keshav-01.png" },
    { name: "Love", role: "Member", photo: "/images/StudentCouncil/7.0/Love-01.png" },
    { name: "Monishka", role: "Member", photo: "/images/StudentCouncil/7.0/Monishka-01.png" },
    { name: "Muskan", role: "Member", photo: "/images/StudentCouncil/7.0/Muskan-01.png" },
    { name: "Nimisha", role: "Member", photo: "/images/StudentCouncil/7.0/Nimisha-01.png" },
    { name: "Pragya", role: "Member", photo: "/images/StudentCouncil/7.0/Pragya-01.png" },
    { name: "Pratima", role: "Member", photo: "/images/StudentCouncil/7.0/Pratima-01.png" },
    { name: "Rajmohan", role: "Member", photo: "/images/StudentCouncil/7.0/Rajmohan-01.png" },
    { name: "Sahil", role: "Member", photo: "/images/StudentCouncil/7.0/Sahil-01.png" },
    { name: "Sakshi", role: "Member", photo: "/images/StudentCouncil/7.0/Sakshi-01.png" },
    { name: "Samarth", role: "Member", photo: "/images/StudentCouncil/7.0/Samarth-01.png" },
    { name: "Srishti", role: "Member", photo: "/images/StudentCouncil/7.0/Srishti.png" },
    { name: "Sunishka", role: "Member", photo: "/images/StudentCouncil/7.0/Sunishka1.png" },
    { name: "Tanya", role: "Member", photo: "/images/StudentCouncil/7.0/Tanya-01.png" },
    { name: "Utkarsh", role: "Member", photo: "/images/StudentCouncil/7.0/Utkarsh-01.png" },
    { name: "Veer", role: "Member", photo: "/images/StudentCouncil/7.0/Veer-01.png" },
    { name: "Vibhor", role: "Member", photo: "/images/StudentCouncil/7.0/Vibhor-01.png" },
    { name: "X", role: "Member", photo: "/images/StudentCouncil/7.0/X-01.png" },
    { name: "Yahskant", role: "Member", photo: "/images/StudentCouncil/7.0/Yahskant-01.png" },
    { name: "Yash", role: "Member", photo: "/images/StudentCouncil/7.0/Yash-01.png" },
  ],
  "9.0": [
    { name: "Abhishek Sir", role: "Member", photo: "/images/StudentCouncil/9.0/Abhishek Sir.png" },
    { name: "Abhishek", role: "Member", photo: "/images/StudentCouncil/9.0/Abhishek.png" },
    { name: "Agrima", role: "Member", photo: "/images/StudentCouncil/9.0/Agrima.png" },
    { name: "Animesh", role: "Member", photo: "/images/StudentCouncil/9.0/Animesh.png" },
    { name: "Ansh", role: "Member", photo: "/images/StudentCouncil/9.0/Ansh.png" },
    { name: "Bhavya", role: "Member", photo: "/images/StudentCouncil/9.0/Bhavya.png" },
    { name: "Divyansh", role: "Member", photo: "/images/StudentCouncil/9.0/Divyansh.png" },
    { name: "Drashya", role: "Member", photo: "/images/StudentCouncil/9.0/Drashya.png" },
    { name: "Rashika", role: "Member", photo: "/images/StudentCouncil/9.0/Rashika.png" },
    { name: "Sakshi", role: "Member", photo: "/images/StudentCouncil/9.0/Sakshi.png" },
    { name: "Shivam", role: "Member", photo: "/images/StudentCouncil/9.0/Shivam.png" },
    { name: "Sumit", role: "Member", photo: "/images/StudentCouncil/9.0/Sumit.png" },
    { name: "Tanisha", role: "Member", photo: "/images/StudentCouncil/9.0/Tanisha.png" },
    { name: "Uday", role: "Member", photo: "/images/StudentCouncil/9.0/Uday.png" },
    { name: "Hardik", role: "Member", photo: "/images/StudentCouncil/9.0/hardik.png" },
    { name: "Srajal", role: "Member", photo: "/images/StudentCouncil/9.0/srajal.png" },
  ],
  "10.0": [
    { name: "Abhay", role: "Member", photo: "/images/StudentCouncil/10.0/Abhay.png" },
    { name: "Aman", role: "Member", photo: "/images/StudentCouncil/10.0/Aman.png" },
    { name: "Animesh", role: "Member", photo: "/images/StudentCouncil/10.0/Animesh.png" },
    { name: "Anmol", role: "Member", photo: "/images/StudentCouncil/10.0/Anmol.png" },
    { name: "Deepak Sir", role: "Member", photo: "/images/StudentCouncil/10.0/Deepak_Sir.png" },
    { name: "Harsh", role: "Member", photo: "/images/StudentCouncil/10.0/Harsh.png" },
    { name: "Krishna", role: "Member", photo: "/images/StudentCouncil/10.0/Krishna.png" },
    { name: "Nandini", role: "Member", photo: "/images/StudentCouncil/10.0/Nandini.png" },
    { name: "Nishant", role: "Member", photo: "/images/StudentCouncil/10.0/Nishant.png" },
    { name: "Nupur", role: "Member", photo: "/images/StudentCouncil/10.0/Nupur.png" },
    { name: "Radha", role: "Member", photo: "/images/StudentCouncil/10.0/Radha.png" },
    { name: "Rishi", role: "Member", photo: "/images/StudentCouncil/10.0/Rishi.png" },
    { name: "Riya", role: "Member", photo: "/images/StudentCouncil/10.0/Riya.png" },
    { name: "Sajal", role: "Member", photo: "/images/StudentCouncil/10.0/Sajal.png" },
    { name: "Shivam", role: "Member", photo: "/images/StudentCouncil/10.0/Shivam.png" },
    { name: "Shivansh", role: "Member", photo: "/images/StudentCouncil/10.0/Shivansh.png" },
    { name: "Somya", role: "Member", photo: "/images/StudentCouncil/10.0/Somya.png" },
    { name: "Sumit", role: "Member", photo: "/images/StudentCouncil/10.0/Sumit.png" },
    { name: "Tanisha", role: "Member", photo: "/images/StudentCouncil/10.0/Tanisha.png" },
    { name: "Tanishq", role: "Member", photo: "/images/StudentCouncil/10.0/Tanishq.png" },
    { name: "Uday", role: "Member", photo: "/images/StudentCouncil/10.0/Uday.png" },
    { name: "Yanshi", role: "Member", photo: "/images/StudentCouncil/10.0/Yanshi.png" },
  ],
  "11.0": [
    { name: "Abhay", role: "Member", photo: "/images/StudentCouncil/11.0/abhay.png" },
    { name: "Abhinav", role: "Member", photo: "/images/StudentCouncil/11.0/abhinav.png" },
    { name: "Aman", role: "Member", photo: "/images/StudentCouncil/11.0/aman.png" },
    { name: "Ananya", role: "Member", photo: "/images/StudentCouncil/11.0/ananya.png" },
    { name: "Antra", role: "Member", photo: "/images/StudentCouncil/11.0/antra.png" },
    { name: "Anuj", role: "Member", photo: "/images/StudentCouncil/11.0/anuj.png" },
    { name: "Aryan", role: "Member", photo: "/images/StudentCouncil/11.0/aryan.png" },
    { name: "Asmit", role: "Member", photo: "/images/StudentCouncil/11.0/asmit.png" },
    { name: "Harsh", role: "Member", photo: "/images/StudentCouncil/11.0/harsh.png" },
    { name: "Harshit", role: "Member", photo: "/images/StudentCouncil/11.0/harshit.png" },
    { name: "Krishna", role: "Member", photo: "/images/StudentCouncil/11.0/krishna.png" },
    { name: "Nancy", role: "Member", photo: "/images/StudentCouncil/11.0/nancy.png" },
    { name: "Rishi", role: "Member", photo: "/images/StudentCouncil/11.0/rishi.png" },
    { name: "Sajal Gupta", role: "Member", photo: "/images/StudentCouncil/11.0/sajalgupta.png" },
    { name: "Samarth", role: "Member", photo: "/images/StudentCouncil/11.0/samarth.png" },
    { name: "Sarthak", role: "Member", photo: "/images/StudentCouncil/11.0/sarthak.png" },
    { name: "Somya", role: "Member", photo: "/images/StudentCouncil/11.0/somya.png" },
    { name: "Tarun", role: "Member", photo: "/images/StudentCouncil/11.0/tarun.png" },
  ],
};

const tabs = Object.entries(councils).map(([version, members]) => ({
  key: version,
  label: `Team Council ${version}`,
  data: members,
}));

function Card({ m }: { m: Member }) {
  return (
    <motion.article
      className="group relative w-full h-[350px] rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 text-white"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-[#FF6B35] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex flex-col items-center h-full relative z-10">
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#f97316]">
          <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-[#1a1a1a]">
            <Image src={m.photo} alt={m.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <h3 className="mt-4 text-xl font-bold text-center group-hover:text-[#FF6B35] transition-colors">{m.name}</h3>
        <div className="h-[2px] w-[40px] bg-[#FF6B35] rounded-full mt-2 group-hover:w-[60px] transition-all" />
        <p className="mt-2 text-neutral-400 text-sm text-center uppercase tracking-wider">{m.role}</p>
        <div className="mt-auto flex items-center justify-center">
          <a href={m.linkedin || "#"} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team() {
  const [active, setActive] = useState(tabs[tabs.length - 1]?.key ?? Object.keys(councils)[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const activeData = useMemo(
    () => tabs.find((t) => t.key === active) ?? tabs[0],
    [active]
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="bg-transparent py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">STUDENT COUNCIL</h2>
          <div className="h-1 w-20 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
        </div>

        {/* Sliding Tabs Section */}
        <div className="relative group max-w-4xl mx-auto mb-16">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1a1a1a] border border-neutral-800 text-white hover:bg-[#FF6B35] transition-colors shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-4 py-4 mask-fade-edges"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex-shrink-0 px-6 py-2 rounded-full border transition-all duration-300 ${
                  active === t.key 
                    ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-[0_0_20px_rgba(255,107,53,0.3)]' 
                    : 'bg-[#1a1a1a] border-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                <span className="text-sm sm:text-base font-medium whitespace-nowrap">{t.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#1a1a1a] border border-neutral-800 text-white hover:bg-[#FF6B35] transition-colors shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Team Grid */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {activeData.data.map((m) => (
                <Card key={`${active}-${m.name}`} m={m} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
