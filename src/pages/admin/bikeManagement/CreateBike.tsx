import { Layout, Card, Typography, Button, Spin } from "antd";
import BRInput from "../../../components/form/BRInput"; // Assuming you have this custom component
import BrForm from "../../../components/form/BrForm";
import BRTextArea from "../../../components/form/BrTextArea";
import { useState } from "react";
import Toast from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { useCreateBikeMutation } from "../../../redux/api/bikes/bikeApi";
import { TBike } from "../../../Type/BikeType";
import { SubmitHandler } from "react-hook-form";

const { Content } = Layout;
const { Title } = Typography;

const CreateBike = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Handle file input changes
  const [createBike, { error, isLoading }] = useCreateBikeMutation();
  const navigate = useNavigate();

  if (isLoading) {
    <Spin>Loading...</Spin>;
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    <p>loading</p>;
  }

  // Handle form submission
  const onSubmit: SubmitHandler<TBike> = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("brand", data?.brand);
    formData.append("pricePerHour", data?.pricePerHour.toString());
    formData.append("name", data?.name);
    formData.append("cc", data?.cc.toString());
    formData.append("description", data?.description);
    formData.append("year", data?.year.toString());
    formData.append("model", data?.model);
    // Append the image file to FormData
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await createBike(formData);
    Toast({ message: "bike successfully created", status: "success" });
    navigate(`/admin/manage-bike`);
  };

  return (
    <div className="pt-16  dark:bg-gray-100 bg-slate-700 h-screen overflow-hidden ">
      <Layout className="min-h-screen flex justify-center items-center dark:bg-gray-100 bg-slate-700">
        <Content style={{ padding: "16px", maxWidth: "500px", width: "100%" }}>
          <Card className="shadow-lg rounded-lg p-4 dark:bg-gray-100 bg-gray-300 ">
            <Title level={3} className="text-center mb-4">
              Create a New Bike
            </Title>

            <BrForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Bike Name */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="name"
                    label="Bike Name"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Price per Hour */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="pricePerHour"
                    label="Price per Hour"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* CC */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="cc"
                    label="CC"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Year */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="year"
                    label="Year"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Model */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="model"
                    label="Model"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="brand"
                    label="Brand"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col sm:col-span-2">
                  <BRTextArea
                    name="description"
                    label="Description"
                    rows={3}
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col w-full">
                  <BRInput
                    type="file"
                    name="image"
                    label="Image"
                    className="w-96"
                    onChange={handleFileChange} // Handle file input changes
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2"
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
