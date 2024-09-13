import React from "react";
import { Controller } from "react-hook-form";
import { Form, Input } from "antd";

interface BRTextAreaProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const { TextArea } = Input;

const BRTextArea: React.FC<BRTextAreaProps> = ({
  name,
  label,
  className,
  disabled,
  rows,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TextArea
              className={className}
              disabled={disabled}
              {...field}
              rows={rows}
              id={name}
              onChange={(e) => {
                field.onChange(e); // Notify react-hook-form
                if (onChange) onChange(e); // Call external onChange handler if provided
              }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BRTextArea;
