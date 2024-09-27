import { useNavigate } from "react-router-dom";
import { useGetAvailableBikeQuery } from "../../redux/api/bikes/bikeApi";
import { TBike } from "../../Type/BikeType";
import { useDispatch } from "react-redux";
import { Bike, setItem } from "../../redux/api/bikes/bikeSlice";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";

const AvailableBikeSection = () => {
  const { data } = useGetAvailableBikeQuery(undefined);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);
  const handleClick = (item: Bike) => {
    dispatch(setItem(item));
    if (user) {
      navigate(`${user?.role}/payment`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="pt-20 min-h-screen dark:bg-base-100 bg-gray-700 px-20 ">
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-300 dark:text-slate-800">
          Available Bikes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((item: TBike) => {
            const { name, brand, model, cc, image, pricePerHour } = item;
            const imageUrl =
              typeof image === "string" ? image : "/images/placeholder.png";

            return (
              <div
                key={name}
                className=" bg-gray-50  shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105"
              >
                {/* Adjust image styling for proper display */}
                <div className="w-full h-48 wrap-centent">
                  <img
                    src={imageUrl}
                    alt={`${name} bike`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-center bg-base-200 m-6 rounded">
                  <h2 className="text-2xl font-bold mb-3">{name}</h2>
                  <p className="text-gray-600 mb-1">{brand}</p>
                  <p className="text-gray-500">Model: {model}</p>
                  <p className="text-gray-500">CC: {cc}cc</p>
                  <p className="text-green-600 font-bold text-xl mt-4">
                    ${pricePerHour}/hour
                  </p>
                </div>

                <button
                  onClick={() => handleClick(item)}
                  className="w-full bg-green-700 text-white font-semibold py-2 rounded hover:bg-green-500 transition-colors duration-300"
                >
                  Rent Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvailableBikeSection;
