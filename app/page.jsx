"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Timeline from "@/components/Timeline";
import Industries from "@/components/Industries";
import Impact from "@/components/Impact";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      document.body.classList.remove("is-preloading");
    } else {
      document.body.classList.add("is-preloading");
    }
    return () => document.body.classList.remove("is-preloading");
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <div
        className="site-shell"
        aria-hidden={!loaded}
        style={{
          opacity: loaded ? 1 : 0,
          visibility: loaded ? "visible" : "hidden",
          transition: "opacity 0.45s ease",
        }}
      >
        <div className="noise-layer" aria-hidden />
        <Cursor />
        <Header />

        <main>
          <Hero />
          <Marquee />
          <About />
          <Expertise />
          <Timeline />
          <Industries />
          <Impact />
          <Services />
          <TechStack />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
