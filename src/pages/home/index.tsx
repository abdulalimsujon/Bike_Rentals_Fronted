import CustomHeader from "../../components/layouts/Header";
import CustomButton from "../../components/form/CustomButton";
import AvailableBikeSection from "./AvailableBikeSection";
import Testimonials from "./Testimonials";
import { useRef } from "react";
import WhyChooseUs from "./WhyChooseUs";
import ContactUs from "./ContractUs";
import CouponAndDiscount from "./CouponAndDiscount";
import Footer from "../../components/layouts/Footer";
import video from "../../assests/v2.webm";

const Home = () => {
  // Create a ref to target the AvailableBikeSection
  const bikeSectionRef = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    if (bikeSectionRef.current) {
      // Scroll to the AvailableBikeSection when the button is clicked
      bikeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="relative h-screen overflow-hidden">
        {/* Header */}
        <CustomHeader />

        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 ">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/webm" />
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay for a darkened effect */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content Overlay */}
        <div className="flex flex-col items-center justify-center h-full text-center text-green-300 dark:text-white z-10">
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to Sk Bike Rentals
          </h1>
          <p className="mt-4 text-xl md:text-2xl" data-aos="fade-down">
            "Ride the Freedom, Rent with Ease."
          </p>
          <div className="py-20">
            <CustomButton
              onClick={onClickHandler}
              className="mt-8 px-6 py-3 text-white font-semibold rounded"
            >
              Explore Now
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Reference AvailableBikeSection */}
      <div ref={bikeSectionRef}>
        <AvailableBikeSection />
      </div>
      <Testimonials />
      <WhyChooseUs />
      <ContactUs />
      <CouponAndDiscount />
      <Footer />
    </div>
  );
};

export default Home;
