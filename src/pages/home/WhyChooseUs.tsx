import { FaDollarSign, FaBicycle, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="py-16  dark:bg-gray-100  bg-slate-700 px-10">
      <div className="container mx-auto text-center ">
        <h2 className="text-4xl font-bold mb-8 dark:text-slate-800  text-green-300">
          Why Choose Us?
        </h2>
        <p className="dark:text-gray-500 text-white pb-10 text-xl">
          We offer the best bikes and service to make your rental experience
          unforgettable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
          {/* Best Prices */}
          <div className="dark:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center bg-slate-400 text-white dark:text-gray-700">
            <FaDollarSign className="text-5xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Best Prices</h3>
            <p className="dark:text-gray-500 text-white">
              Get the best prices on the latest models with no hidden fees.
            </p>
          </div>

          {/* Wide Selection */}
          <div className="dark:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center bg-slate-400 text-white dark:text-gray-700">
            <FaBicycle className="text-5xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Wide Selection</h3>
            <p className=" dark:text-gray-500 text-white">
              Choose from a wide range of high-quality bikes for every type of
              rider.
            </p>
          </div>

          {/* Excellent Customer Service */}
          <div className="dark:bg-white p-6 rounded-lg shadow-lg flex flex-col items-center bg-slate-400 text-white dark:text-gray-700">
            <FaHeadset className="text-5xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white dark:text-gray-700">
              Excellent Customer Service
            </h3>
            <p className="text-gray-600 ">
              Our friendly team is available 24/7 to help with any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
