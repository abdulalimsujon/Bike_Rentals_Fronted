import { Layout, Card, Typography, Button, Input } from "antd";
import { useState } from "react";
import BRInput from "../../../components/form/BRInput"; // Assuming you have this custom component
import BrForm from "../../../components/form/BrForm";
import BRTextArea from "../../../components/form/BrTextArea";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const CreateBike = () => {
  const [formData, setFormData] = useState(new FormData());

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevFormData) => {
        const newFormData = new FormData(prevFormData);
        newFormData.append("image", file);
        return newFormData;
      });
    }
  };

  const onsubmit = (values) => {
    const newFormData = new FormData();

    // Append all form values
    Object.keys(values).forEach((key) => {
      newFormData.append(key, values[key]);
    });

    // Append the image file if it exists
    const imageFile = formData.get("image");
    if (imageFile) {
      newFormData.append("image", imageFile);
    }

    // Logging the FormData for inspection
    for (let pair of newFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  return (
    <div className="pt-16 overflow-hidden bg-fuchsia-400 h-screen">
      <Layout className="min-h-screen flex justify-center items-center">
        <Content style={{ padding: "20px", maxWidth: "600px", width: "100%" }}>
          <Card className="shadow-lg rounded-lg p-6 bg-white">
            <Title level={2} className="text-center mb-6">
              Create a New Bike
            </Title>

            <BrForm onSubmit={onsubmit}>
              {/* Container for Flex Rows */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Bike Name */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="name"
                    label="bike name"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* Price per Hour */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="pricePerHour"
                    label="price per hour"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* CC */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="cc"
                    label="CC"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* Year */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    label="year"
                    name="year"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* Model */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="model"
                    label="model"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="brand"
                    label="brand"
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <label className="mb-1 text-sm font-medium">
                    Description
                  </label>
                  <BRTextArea
                    name="description"
                    label="description"
                    rows={4}
                    className="w-full border-gray-300 border rounded-lg p-2"
                  />
                </div>

                {/* Image URL */}
                <div className="flex flex-col w-full">
                  <BRInput
                    type="file"
                    name="image"
                    label="Image"
                    className="w-full border-gray-300 border rounded-lg p-2"
                    onChange={handleFileChange} // Handle file input changes
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
                >
                  Create Bike
                </Button>
              </div>
            </BrForm>
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default CreateBike;
