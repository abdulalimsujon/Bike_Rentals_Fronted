import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

interface BRInputProps {
  type: React.HTMLInputTypeAttribute; // Use the built-in HTML input types
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BRInput: React.FC<BRInputProps> = ({
  type,
  name,
  label,
  className,
  disabled,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            {type === "file" ? (
              // Special handling for file input
              <input
                className={className}
                disabled={disabled}
                type="file"
                id={name}
                onChange={(e) => {
                  field.onChange(e); // Notify react-hook-form
                  if (onChange) onChange(e); // Call external onChange handler if provided
                }}
              />
            ) : (
              // Default Input for other types
              <Input
                className={className}
                disabled={disabled}
                {...field}
                type={type}
                id={name}
                size="large"
              />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BRInput;
