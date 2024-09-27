import React, { useState } from "react";
import { Modal, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setBonus } from "../../redux/api/bikes/bikeSlice";

// List of possible discounts
const discounts = [
  { label: "10%", code: "DISCOUNT10" },
  { label: "20%", code: "DISCOUNT20" },
  { label: "30%", code: "DISCOUNT30" },
];

const getRandomDiscount = () => {
  const randomIndex = Math.floor(Math.random() * discounts.length);
  return discounts[randomIndex];
};

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const dispatch = useDispatch();
  const [spinResult, setSpinResult] = useState<{
    label: string;
    code: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const result = getRandomDiscount();
      console.log(result);
      setSpinResult(result);
      setModalVisible(true);
      setIsSpinning(false);
      console.log(result.code);
      dispatch(setBonus({ code: result?.code, value: result?.label }));
    }, 2000);
  };

  const handleCopy = () => {
    if (spinResult) {
      navigator.clipboard.writeText(spinResult.code);
      alert("Coupon code copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-40 mt-12">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Spin the Wheel for a Discount!</h1>
      </div>

      <div className="relative">
        <div
          className={`w-64 h-64 rounded-full border-4 border-blue-500 ${
            isSpinning ? "animate-spin" : ""
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {isSpinning ? "Spinning..." : "Spin Me"}
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="mt-6"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin Now"}
        </Button>
      </div>

      <Modal
        title="You Won a Discount!"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="copy" icon={<CopyOutlined />} onClick={handleCopy}>
            Copy Code
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            OK
          </Button>,
        ]}
      >
        {spinResult && (
          <div className="text-center">
            <p className="text-3xl font-bold">{spinResult.label} OFF!</p>
            <p className="text-lg mt-4">
              Coupon Code: <strong>{spinResult.code}</strong>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const CouponsDiscounts = () => {
  return (
    <div className="dark:bg-gray-100 bg-slate-700 py-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center dark:text-slate-800 text-green-300 mb-12">
          Coupons & Discounts
        </h2>

        {/* Coupons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Instructions */}
        <div className="mt-12">
          <h4 className="text-2xl font-semibold text-center text-white dark:text-gray-500 mb-6">
            How to Apply Coupons
          </h4>
          <p className="text-center dark:text-gray-700 text-white text-lg">
            At checkout, simply enter your coupon code in the "Promo Code" field
            and click "Apply". Your discount will be automatically applied to
            your total.
          </p>
        </div>

        {/* Spin Wheel Section */}
        <SpinWheel />
      </div>
    </div>
  );
};

export default CouponsDiscounts;
