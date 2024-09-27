import { useNavigate, useParams } from "react-router-dom";
import { Spin, Alert, Button } from "antd";
import { CiCalendar } from "react-icons/ci";
import { RiEBikeLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import CustomDatePicker from "../../components/form/CustomDatePicker";
import BrForm from "../../components/form/BrForm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useSingleBikeQuery } from "../../redux/api/bikes/bikeApi";
import { useDispatch } from "react-redux";
import { rentPeriodWithBike } from "../../redux/features/rentSlice";

dayjs.extend(utc);

const BikeDetails = () => {
  const { bikeId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Fetch the bike details using the bikeId
  const { data, error, isLoading } = useSingleBikeQuery(bikeId);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin
          tip={
            <span style={{ fontSize: "24px" }}>Loading bike details...</span>
          }
          size="large"
          style={{ fontSize: "50px" }}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center">
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
    brand,
    cc,
    model,
    year,
    isAvailable,
  } = data?.data || {};

  // Handle form submission and format the startTime and endTime
  const onSubmit = (formData: { startTime: string }) => {
    const { startTime } = formData;

    // Add bikeId to the formData
    const dataWithBikeId = {
      ...formData,
      _id: bikeId, // Add bikeId to the form data
    };

    dispatch(rentPeriodWithBike(dataWithBikeId));

    // Format startTime and endTime to "YYYY-MM-DDTHH:mm:ssZ" format
    const formattedStartTime = startTime
      ? dayjs(startTime).utc().format("YYYY-MM-DDTHH:mm:ss[Z]")
      : null;

    console.log({
      startTime: formattedStartTime,
      bikeId, // log the bikeId for debugging
    });

    // After successful form submission, navigate to the role-based rental page
    if (user?.role) {
      navigate(`/${user.role}/payment`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center dark:bg-gray-50 bg-slate-700 mx-40 ">
      <div className="container p-4 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 bg-white  shadow-lg rounded-lg p-6">
            <div className="flex flex-col">
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center bg-green-300 dark:bg-slate-100 p-4 rounded-lg shadow-md">
                  <CiCalendar size={25} />
                  <span className="mt-2 text-sm">Reg Year: {year}</span>
                </div>
                <div className="flex flex-col items-center bg-green-300 dark:bg-slate-100 p-4 rounded-lg shadow-md">
                  <RiEBikeLine size={25} />
                  <span className="mt-2 text-sm">CC: {cc}</span>
                </div>
                <div className="flex flex-col items-center bg-green-300 dark:bg-slate-100 p-4 rounded-lg shadow-md">
                  <CiSettings size={25} />
                  <span className="mt-2 text-sm">Model: {model}</span>
                </div>
              </div>
              <div className="bg-slate-200 p-4 rounded-lg shadow-md">
                <h1 className="text-center text-lg font-semibold mb-4">
                  Vehicle Overview
                </h1>
                <p>{description}</p>
              </div>
            </div>
          </div>

          {/* Right side content (col-span-12 md:col-span-4) - Image Section */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Name: {name}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Price Per Hour: ${pricePerHour}
              </h2>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Brand: {brand}
              </h2>
              <h2
                className={`text-lg font-semibold ${
                  isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAvailable ? "Available" : "Not Available"}
              </h2>
            </div>

            <div className="bg-green-300 dark:bg-slate-100 p-4 mt-4 rounded-lg shadow-md">
              <h2 className="text-center text-lg font-semibold mb-4">
                Book Now
              </h2>
              <BrForm onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                  <CustomDatePicker name="startTime" label="Start Time" />
                  <Button
                    htmlType="submit"
                    loading={isLoading}
                    className="w-full bg-green-700"
                  >
                    Book Now
                  </Button>
                </div>
              </BrForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
