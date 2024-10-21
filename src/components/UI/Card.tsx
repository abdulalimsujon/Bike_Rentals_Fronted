import { Button, ConfigProvider } from "antd";
import { TBike } from "../../Type/BikeType";
import { useNavigate } from "react-router-dom";

const Card = (item: TBike) => {
  const { _id, name, brand, image } = item;
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="card dark:bg-gray-50 bg-gray-500  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="p-5 flex flex-col items-center ">
          {/* Image Container */}
          <div className="rounded-xl overflow-hidden w-full h-48">
            <img
              src={image as string}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h5 className="text-xl md:text-2xl  mt-4 dark:text-gray-800 text-green-300 font-bold ">
            {name}
          </h5>

          {/* Brand */}
          <h6 className="text-lg md:text-xl  mt-2 dark:text-gray-800 text-green-300 font-bold">
            Brand: {brand}
          </h6>

          {/* Button */}
          <Button
            type="primary"
            className="w-full"
            onClick={() => navigate(`/bike-details/${_id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Card;
