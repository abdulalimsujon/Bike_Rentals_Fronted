/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, DatePicker, Button, Row, Col } from "antd";
import dayjs from "dayjs";

const BookingForm: React.FC = () => {
  // Initial values for startTime and returnTime
  const initialValues = {
    startTime: dayjs("2024-06-10T09:00:00Z"),
    returnTime: dayjs("2024-06-10T18:00:00Z"),
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col span={12}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            startTime: initialValues.startTime,
            returnTime: initialValues.returnTime,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              { required: true, message: "Please select the start time!" },
            ]}
          >
            <DatePicker
              showTime
              defaultValue={initialValues.startTime}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Return Time"
            name="returnTime"
            rules={[
              { required: true, message: "Please select the return time!" },
            ]}
          >
            <DatePicker
              showTime
              defaultValue={initialValues.returnTime}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Booking
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default BookingForm;
