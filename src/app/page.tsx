"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { 
  Skeleton,
  HeroSkeleton, 
  AboutSkeleton, 
  SectionSkeleton, 
  GridSkeleton,
  TeamSkeleton,
  EventSkeleton 
} from "@/components/ui/Skeleton";

// Immediate load for above-the-fold content
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  loading: () => <HeroSkeleton />
});
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <AboutSkeleton />
});

// Lazy load below-the-fold content with better loading strategy
const Stats = dynamic(() => import("@/components/sections/Stats"), {
  loading: () => (
    <SectionSkeleton title={false}>
      <GridSkeleton columns={4} items={4} />
    </SectionSkeleton>
  )
});
const Partners = dynamic(() => import("@/components/sections/Partners"), {
  loading: () => (
    <SectionSkeleton>
      <div className="flex flex-wrap gap-8 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-32" />
        ))}
      </div>
    </SectionSkeleton>
  )
});
const Pillars = dynamic(() => import("@/components/sections/Pillars"), {
  loading: () => <SectionSkeleton />
});
const Initiatives = dynamic(() => import("@/components/sections/Initiatives"), {
  loading: () => (
    <SectionSkeleton>
      <GridSkeleton columns={3} items={3} />
    </SectionSkeleton>
  )
});
const Startups = dynamic(() => import("@/components/sections/Startups"), {
  loading: () => (
    <SectionSkeleton>
      <GridSkeleton columns={3} items={3} />
    </SectionSkeleton>
  )
});
const Team = dynamic(() => import("@/components/sections/Team"), {
  loading: () => (
    <SectionSkeleton>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {Array.from({ length: 4 }).map((_, i) => <TeamSkeleton key={i} />)}
      </div>
    </SectionSkeleton>
  )
});
const Mentors = dynamic(() => import("@/components/sections/Mentors"), {
  loading: () => (
    <SectionSkeleton>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {Array.from({ length: 4 }).map((_, i) => <TeamSkeleton key={i} />)}
      </div>
    </SectionSkeleton>
  )
});
const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
  loading: () => (
    <SectionSkeleton>
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
      <GridSkeleton columns={3} items={6} />
    </SectionSkeleton>
  )
});
const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => (
    <SectionSkeleton>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </SectionSkeleton>
  )
});
const ContactForm = dynamic(() => import("@/components/sections/ContactForm"), {
  loading: () => (
    <SectionSkeleton>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-40" />
        </div>
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </SectionSkeleton>
  )
});

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <main>
        {/* Above the fold - Load immediately */}
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<AboutSkeleton />}>
          <About />
        </Suspense>
        
        {/* Below the fold - Lazy load with intersection observer */}
        <Suspense fallback={
          <SectionSkeleton title={false}>
            <GridSkeleton columns={4} items={4} />
          </SectionSkeleton>
        }>
          <Stats />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="flex flex-wrap gap-8 justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-32" />
              ))}
            </div>
          </SectionSkeleton>
        }>
          <Partners />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Pillars />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <GridSkeleton columns={3} items={3} />
          </SectionSkeleton>
        }>
          <Initiatives />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <GridSkeleton columns={3} items={3} />
          </SectionSkeleton>
        }>
          <Startups />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {Array.from({ length: 4 }).map((_, i) => <TeamSkeleton key={i} />)}
            </div>
          </SectionSkeleton>
        }>
          <Team />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {Array.from({ length: 4 }).map((_, i) => <TeamSkeleton key={i} />)}
            </div>
          </SectionSkeleton>
        }>
          <Mentors />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
            <GridSkeleton columns={3} items={6} />
          </SectionSkeleton>
        }>
          <Gallery />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </SectionSkeleton>
        }>
          <FAQ />
        </Suspense>
        
        <Suspense fallback={
          <SectionSkeleton>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-40" />
              </div>
              <Skeleton className="h-full w-full rounded-2xl" />
            </div>
          </SectionSkeleton>
        }>
          <ContactForm />
        </Suspense>
      </main>
    </div>
  );
}
