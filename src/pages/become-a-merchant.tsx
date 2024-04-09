import BannerSeller from "@/components/BecomeSeller/BannerSeller";
import BgTextSection from "@/components/BecomeSeller/BgTextSection";
import FeatureSeller from "@/components/BecomeSeller/FeatureSeller";
import HowWorksSeller from "@/components/BecomeSeller/HowWorksSeller";
import TestimonialSeller from "@/components/BecomeSeller/TestimonialSeller";
import ReadyToStart from "@/components/Home/ReadyToStart";
import HomeLayout from "@/layout/HomeLayout";

export default function index() {
  const readySection = {
    title: "Ready to Grow Your Business?",
    details:
      "Join Acctbazaar today and experience the benefits of a vibrant P2P selling community. Sign up now to start your journey towards increased visibility, sales, and success.",
    buttonText: "Sign up now",
    linkSrc: "/auth/sign-up",
  };

  return (
    <HomeLayout>
      <BannerSeller />
      <BgTextSection />
      <FeatureSeller />
      <HowWorksSeller />
      <TestimonialSeller />
      <ReadyToStart readySection={readySection} />
    </HomeLayout>
  );
}
