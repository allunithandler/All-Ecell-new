import type { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery | E-Cell GLA University",
  description: "Glimpses of events and activities at E-Cell GLA University.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
       <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Gallery</h1>
        <Gallery />
      </div>
    </div>
  );
}
