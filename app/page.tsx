import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Tension } from "@/components/sections/Tension";
import { Demo } from "@/components/sections/Demo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Courses } from "@/components/sections/Courses";
import { News } from "@/components/sections/News";
import { Bios } from "@/components/sections/Bios";
import { Companies } from "@/components/sections/Companies";
import { Proof } from "@/components/sections/Proof";
import { ValueStack } from "@/components/sections/ValueStack";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 */} <Hero />
        {/* 2 */} <Tension />
        {/* 3 */} <Demo />
        {/* 4 */} <HowItWorks />
        {/* 5 */} <Courses />
        {/* 6 */} <News />
        {/* 7 */} <Bios />
        {/* 8 */} <Companies />
        {/* 9 */} <Proof />
        {/* 10 */} <ValueStack />
        {/* 11 */} <Pricing />
        {/* 12 */} <FinalCTA />
      </main>
      {/* 13 */}
      <Footer />
    </>
  );
}
