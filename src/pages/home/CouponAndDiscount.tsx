const CouponsDiscounts = () => {
  return (
    <div className="dark:bg-gray-100    bg-slate-700 py-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center dark:text-slate-800 text-green-300 mb-12">
          Coupons & Discounts
        </h2>

        {/* Coupons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coupon 1 */}
          <div className="bg-slate-400 dark:bg-white p-6 rounded-lg shadow-lg text-white dark:text-gray-500 transform transition duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              10% Off First Rental
            </h3>
            <p>
              Use code <span className="font-bold">FIRST10</span> at checkout to
              get 10% off your first bike rental.
            </p>
            <p className="mt-2 text-sm text-gray-300 dark:text-gray-600">
              Valid until 12/31/2024
            </p>
          </div>

          {/* Coupon 2 */}
          <div className="bg-slate-400 dark:bg-white p-6 rounded-lg shadow-lg text-white dark:text-gray-500 transform transition duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Free Extra Hour</h3>
            <p>
              Rent for 3 hours or more and get an extra hour for free with code{" "}
              <span className="font-bold">EXTRAHOUR</span>.
            </p>
            <p className="mt-2 text-sm text-gray-300 dark:text-gray-600">
              Valid for weekend rentals only
            </p>
          </div>

          {/* Coupon 3 */}
          <div className="bg-slate-400 dark:bg-white p-6 rounded-lg shadow-lg text-white dark:text-gray-500 transform transition duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              25% Off Weekend Special
            </h3>
            <p>
              Get 25% off your weekend rentals with the code{" "}
              <span className="font-bold">WEEKEND25</span>.
            </p>
            <p className="mt-2 text-sm text-gray-300 dark:text-gray-600">
              Available for weekend bookings only
            </p>
          </div>
        </div>

        {/* Instructions on How to Apply Coupons */}
        <div className="mt-12">
          <h4 className="text-2xl font-semibold text-center text-white dark:text-gray-500 mb-6">
            How to Apply Coupons
          </h4>
          <p className="text-center  dark:text-gray-700 text-white text-lg">
            At checkout, simply enter your coupon code in the "Promo Code" field
            and click "Apply". Your discount will be automatically applied to
            your total.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponsDiscounts;
