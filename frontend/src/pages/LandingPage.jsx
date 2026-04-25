import CTA from "../components/landing page/CTA";
import DashboardPreview from "../components/landing page/DashboardPreview";
import FAQ from "../components/landing page/FAQ";
import Features from "../components/landing page/Features";
import Footer from "../components/landing page/Footer";
import Hero from "../components/landing page/Hero";
import Navbar from "../components/landing page/Navbar";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen isolate bg-white">
      <div className="fixed inset-0 pointer-events-none -z-50">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-300 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute top-[35%] left-[40%] w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <DashboardPreview />
        <Features />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
