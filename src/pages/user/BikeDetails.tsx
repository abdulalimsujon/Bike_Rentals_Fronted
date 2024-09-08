import { useParams } from "react-router-dom";
import { useSingleBikeQuery } from "../../redux/features/bikes/bikeApi";
import { Spin, Alert } from "antd";
import { CiCalendar } from "react-icons/ci";
import { RiEBikeLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import CustomButton from "../../components/form/CustomButton";

const BikeDetails = () => {
  const { bikeId } = useParams();

  // Fetch the bike details using the bikeId
  const { data, error, isLoading } = useSingleBikeQuery(bikeId);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin
          tip={
            <span style={{ fontSize: "24px" }}>Loading bike details...</span>
          } // Larger tip text
          size="large" // Larger default spinner
          style={{ fontSize: "50px" }} // Increase spinner size
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Alert
          message="Error"
          description="Failed to fetch bike details."
          type="error"
        />
      </div>
    );
  }

  // Destructuring bike data directly from the response
  const {
    name,
    description,
    pricePerHour,
    image,
    brand,
    cc,
    model,
    year,
    isAvailable,
  } = data?.data || {};

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 ">
            <div className="flex  flex-col ">
              <div className="flex gap-3">
                <div className="wrap-content h-16  flex justify-center items-center p-3 flex-col bg-green-300">
                  <div className="">
                    <div className="">
                      <CiCalendar size={25} />
                    </div>
                  </div>
                  <div className="">Reg Year: {year}</div>
                </div>
                <div className="wrap-content h-16  flex justify-center items-center p-3 flex-col bg-green-300">
                  <div className="">
                    <div className="">
                      <RiEBikeLine size={25} />
                    </div>
                  </div>
                  <div className=""> CC: {cc}</div>
                </div>
                <div className="wrap-content h-16 bg-green-300 flex justify-center items-center p-3 flex-col">
                  <div className="">
                    <div className="">
                      <CiSettings size={25} />
                    </div>
                  </div>
                  <div className=""> Model : {model}</div>
                </div>
              </div>
              <div className="bg-slate-200 mt-5 h-[370px] text-md">
                <div className="wrap-content w-40 h-10 dark:bg-green-700     bg-green-300 ">
                  <h1 className="text-center pt-2  dark:text-white   text-slate-700 text-md">
                    Vahicle Overview
                  </h1>
                </div>
                <div className="pt-4 text-md">
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Left side content (col-span-9) - Image Section */}
          <div className="col-span-12 md:col-span-4  ">
            <img
              src={image}
              alt={name}
              className="object-cover rounded-lg w-full"
              style={{ maxHeight: "350px" }}
            />
            <div className="bg-green-300 text-md p-3 dark:text-slate-700 dark:bg-slate-300 text-lg">
              <div className=" flex justify-center items-center ">
                <div className="">
                  <h1>Name : {name}</h1>
                  <h1>Brand : {brand}</h1>
                  <h1>Price Per Hour : {pricePerHour}</h1>
                  <p className="text-lg  mb-3">
                    Status : {isAvailable ? "Available" : "Unavailable"}
                  </p>
                  <CustomButton className="mt-3">Book now</CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
