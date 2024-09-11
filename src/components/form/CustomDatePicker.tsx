import { Controller } from "react-hook-form";
import { Form, DatePicker as AntdDatePicker, TimePicker } from "antd";
import dayjs from "dayjs"; // Import dayjs for formatting
import utc from "dayjs/plugin/utc"; // Plugin for handling UTC
dayjs.extend(utc); // Extend dayjs with UTC plugin

const CustomDatePicker = ({ label, name }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => {
          // Extract date and time from field.value if available
          const dateValue = field.value ? dayjs(field.value).utc() : null;
          const date = dateValue ? dateValue.format("YYYY-MM-DD") : null;
          const time = dateValue ? dateValue.format("HH:mm:ss") : null;

          return (
            <Form.Item label={label}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <div style={{ flex: 1 }}>
                  <AntdDatePicker
                    format="YYYY-MM-DD"
                    id={`${name}-date`}
                    style={{ width: "100%" }}
                    value={date ? dayjs(date) : null}
                    onChange={(date) => {
                      // Handle date change
                      const formattedDate = date
                        ? dayjs(date).utc().format("YYYY-MM-DD")
                        : null;
                      const newValue = date
                        ? `${formattedDate}T${time || "00:00:00"}Z`
                        : null;
                      field.onChange(newValue); // Update field with formatted date
                    }}
                    onBlur={field.onBlur}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TimePicker
                    placeholder="Hour : Min : Sec"
                    format="HH:mm:ss"
                    id={`${name}-time`}
                    style={{ width: "100%" }}
                    value={
                      time
                        ? dayjs(`1970-01-01 ${time}`, "YYYY-MM-DD HH:mm:ss")
                        : null
                    }
                    onChange={(time) => {
                      // Handle time change
                      const formattedTime = time
                        ? dayjs(time).format("HH:mm:ss")
                        : "00:00:00";
                      const newValue = date
                        ? `${date}T${formattedTime}Z`
                        : null;
                      field.onChange(newValue); // Update field with formatted date and time
                    }}
                    onBlur={field.onBlur}
                  />
                </div>
              </div>
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
