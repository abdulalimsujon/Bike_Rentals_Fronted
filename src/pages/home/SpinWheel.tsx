import { useState } from "react";
import { Modal, Button, ConfigProvider } from "antd";
import { CopyOutlined } from "@ant-design/icons";

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
  const [spinResult, setSpinResult] = useState<{
    label: string;
    code: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    // Simulate spinning for 2 seconds
    setTimeout(() => {
      const result = getRandomDiscount();
      setSpinResult(result);
      setModalVisible(true);
      setIsSpinning(false);
      // Automatically set coupon on Rental page (could be through context or state management)
      localStorage.setItem("rentalDiscount", result.code);
    }, 2000);
  };

  const handleCopy = () => {
    if (spinResult) {
      navigator.clipboard.writeText(spinResult.code);
      alert("Coupon code copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-40">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Spin the Wheel for a Discount!</h1>
      </div>

      <div className="relative">
        <div
          className={`w-64 h-64 rounded-full border-4 border-green-500 ${
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b", // Main primary color (Bright Green)
            colorPrimaryHover: "#007a53", // Darker Green for hover effect
            colorPrimaryBorder: "#00b96b", // Border color for primary components
            colorPrimaryActive: "#005f40", // Active color for primary components (used on focus)
            borderRadius: 2,
            colorBgContainer: "#f6ffed", // Background color for cont
          },
        }}
      >
        <Modal
          title="You Won a Discount! please use this to pay"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button
              type="primary"
              key="copy"
              icon={<CopyOutlined />}
              onClick={handleCopy}
            >
              Copy Code
            </Button>,
            <Button
              className="hover:bg-green-700"
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
      </ConfigProvider>
    </div>
  );
};

export default SpinWheel;
