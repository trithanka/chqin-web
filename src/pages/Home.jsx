import React, { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import Arrival from "@/components/sections/Arrival";
import PipelineDemo from "@/components/sections/PipelineDemo";
import WhySection from "@/components/sections/WhySection";
import Experience from "@/components/sections/Experience";
import Comparison from "@/components/sections/Comparison";
import Security from "@/components/sections/Security";
import OneQR from "@/components/sections/OneQR";
import Network from "@/components/sections/Network";
import Business from "@/components/sections/Business";
import DemoModal from "@/components/DemoModal";
import { scrollToId } from "@/lib/scroll";

const Final = lazy(() => import("@/components/sections/Final"));

function SectionFallback() {
  return <div className="min-h-screen w-full bg-black" aria-hidden="true" />;
}

function Deferred({ id, children }) {
  return (
    <div id={id}>
      <Suspense fallback={<SectionFallback />}>{children}</Suspense>
    </div>
  );
}

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToWaitlist = () => scrollToId("final");

  return (
    <main className="bg-black">
      <Toaster position="top-center" theme="dark" />
      
      {/* Navigation */}
      <Navigation visible={navVisible} onOpenDemo={() => setDemoOpen(true)} />
      
      {/* Interactive Live Demo Modal */}
      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        onJoinWaitlist={goToWaitlist}
      />

      {/* Continuous Apple Keynote Narrative Flow */}
      <Arrival onOpenDemo={() => setDemoOpen(true)} />
      <PipelineDemo />
      <WhySection />
      <Experience />
      <Comparison />
      <Security />
      <OneQR />
      <Network />
      <Business />
      
      <Deferred id="final">
        <Final />
      </Deferred>
    </main>
  );
}
