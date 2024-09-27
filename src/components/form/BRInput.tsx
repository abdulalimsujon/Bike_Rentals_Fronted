import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

interface BRInputProps {
  type: React.HTMLInputTypeAttribute; // Built-in HTML input types
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Add error prop for validation messages
}

const BRInput: React.FC<BRInputProps> = ({
  type,
  name,
  label,
  className,
  disabled,
  onChange,

  error, // Use error prop
}) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error} // Show validation error
          >
            {type === "file" ? (
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
