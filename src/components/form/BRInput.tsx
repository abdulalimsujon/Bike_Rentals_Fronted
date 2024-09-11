import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

interface BRInputProps {
  type: React.HTMLInputTypeAttribute; // Use the built-in HTML input types
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
}

const BRInput: React.FC<BRInputProps> = ({
  type,
  name,
  label,
  className,
  disabled,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              className={className}
              disabled={disabled}
              {...field}
              type={type}
              id={name}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BRInput;
