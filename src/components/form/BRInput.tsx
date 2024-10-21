import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

interface BRInputProps {
  type: React.HTMLInputTypeAttribute; // Built-in HTML input types
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
        render={({ field, fieldState: { error } }) => (
          <>
            {/* Log the error here */}
            {error && console.log(`Error in ${name}:`, error)}

            <Form.Item
              label={label}
              validateStatus={error ? "error" : ""}
              help={error ? error.message : null} // Show error message if exists
            >
              {type === "file" ? (
                <Input
                  className={` focus:border-green-700 focus:ring focus:ring-green-300 focus:ring-opacity-50 ${className}`}
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
                  className={` focus:border-green-700  focus:ring-green-300 focus:ring-opacity-50 ${className}`}
                  disabled={disabled}
                  {...field}
                  type={type}
                  id={name}
                  size="large"
                />
              )}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default BRInput;
