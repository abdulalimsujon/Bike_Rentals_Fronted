import { Card } from "antd";
import CustomButton from "../form/CustomButton";
import { TBike } from "../../Type/BikeType";

const CustomCard = ({
  data,
  buttonName,
  handleClick,
}: {
  data: TBike;
  buttonName: string;
  handleClick: () => void;
}) => {
  const { name, image, cc, description } = data;
  const imageUrl =
    typeof image === "string" ? image : URL.createObjectURL(image as File);

  return (
    <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] mx-auto dark:text-green-700 text-green-300">
      <Card
        title={
          <div className="bg-green-300 dark:bg-green-700 text-white py-2 rounded pl-3 text-center">
            <small>{name}</small>
          </div>
        }
        bordered={false}
        className="w-full h-auto shadow-lg rounded-md text-green-300 dark:text-green-700 bg-slate-700 dark:bg-slate-50 border dark:border-none"
      >
        <div className="flex flex-col md:flex-row h-full w-full">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-2">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover rounded-md max-h-[200px] md:max-h-[400px] w-full"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-4 dark:bg-slate-100">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-center md:text-left">
              {name}
            </h2>
            <p className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
              CC: {cc}
            </p>
            <p className="text-sm md:text-base text-gray-300 dark:text-gray-700 text-center md:text-left">
              {description}
            </p>
            <div className="mt-5 flex justify-center md:justify-start">
              <CustomButton onClick={handleClick} className="btn btn-primary">
                {buttonName}
              </CustomButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomCard;
