import { Button, ButtonProps } from "antd";

const CustomButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={`bg-green-700 hover:bg-green-600 border-green-500 hover:border-green-300 text-white`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
