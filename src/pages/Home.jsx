import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import Arrival from "@/components/sections/Arrival";
import Experience from "@/components/sections/Experience";
import Moment from "@/components/sections/Moment";
import OneQR from "@/components/sections/OneQR";
import Network from "@/components/sections/Network";
import Business from "@/components/sections/Business";
import Final from "@/components/sections/Final";
import Footer from "@/components/Footer";

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToFinal = () => {
    const el = document.getElementById("final");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-black">
      <Toaster position="top-center" theme="dark" />
      <Navigation visible={navVisible} onCta={goToFinal} />
      <Arrival />
      <Experience />
      <Moment />
      <OneQR />
      <Network />
      <Business />
      <Final />
      <Footer />
    </main>
  );
}
