import { Layout, Card, Typography, Button } from "antd";
import BRInput from "../../../components/form/BRInput"; // Assuming you have this custom component
import BrForm from "../../../components/form/BrForm";
import BRTextArea from "../../../components/form/BrTextArea";
import { useState } from "react";
import Toast from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { useCreateBikeMutation } from "../../../redux/api/bikes/bikeApi";
import { TBike } from "../../../Type/BikeType";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderSpinner from "../../../utilities/LoaderSpinner";

const { Content } = Layout;
const { Title } = Typography;

const bikeSchema = z.object({
  name: z.string().min(1, "Bike name is required"),
  pricePerHour: z
    .string()
    .min(1, "Price per hour is required")
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine(
      (val) => !isNaN(val) && val > 0,
      "Price per hour must be a positive number"
    ),
  cc: z
    .string()
    .min(1, "CC is required")
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val) && val > 0, "CC must be a positive number"),
  year: z
    .string()
    .min(1, "Year is required")
    .transform((val) => parseInt(val, 10)) // Convert string to integer
    .refine(
      (val) => val >= 1900 && val <= new Date().getFullYear(),
      "Year must be a valid year"
    ),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().optional(),
});

const CreateBike = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [createBike, { isLoading }] = useCreateBikeMutation();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await createBike(formData);
    Toast({ message: "Bike successfully created", status: "success" });
    navigate(`/admin/manage-bike`);
  };

  return (
    <div className="pt-8 dark:bg-gray-100 bg-slate-700">
      <Layout className="min-h-screen flex justify-center items-center dark:bg-gray-100 bg-slate-700">
        <Content className="p-2 w-full max-w-xs">
          <Card className="shadow-md rounded-lg p-4 dark:bg-gray-100 bg-gray-300">
            <Title level={3} className="text-center mb-2 text-base">
              Create a New Bike
            </Title>

            <BrForm onSubmit={onSubmit} resolver={zodResolver(bikeSchema)}>
              <div className="grid grid-cols-2 gap-4">
                {" "}
                {/* Two columns with gap */}
                <BRInput
                  type="text"
                  name="name"
                  label="Bike Name"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
                <BRInput
                  type="number"
                  name="pricePerHour"
                  label="Price per Hour"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
                <BRInput
                  type="number"
                  name="cc"
                  label="CC"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
                <BRInput
                  type="number"
                  name="year"
                  label="Year"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
                <BRInput
                  type="text"
                  name="model"
                  label="Model"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
                <BRInput
                  type="text"
                  name="brand"
                  label="Brand"
                  className="col-span-1 w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
              </div>

              <div className="mt-4">
                {" "}
                {/* Separate row for description */}
                <BRTextArea
                  name="description"
                  label="Description"
                  rows={2} // Reduced rows for smaller input area
                  className="w-full border-gray-300 border rounded-lg p-1 text-sm"
                />
              </div>

              <div className="mt-4">
                <BRInput
                  type="file"
                  name="image"
                  label="Image"
                  className="w-full"
                  onChange={handleFileChange} // Handle file input changes
                />
              </div>

              <div className="text-center mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full  hover:bg-green-500 bg-green-700 text-white rounded-lg py-1 text-sm"
                ></Button>
              </div>
            </BrForm>
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default CreateBike;
