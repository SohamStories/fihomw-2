import CTASection from "@/components/ctasection";
import FeaturesSection from "@/components/featuresection";
import Footer from "@/components/footer";
import HeroSection from "@/components/herosection";
import Navbar from "@/components/nav";
import ReviewsSection from "@/components/reviewsection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
    <HeroSection />
    <FeaturesSection />
    <ReviewsSection />
    <CTASection />
    <Footer />
  </div>
  );
}
