import { useGetAvailableBikeQuery } from "../../redux/api/bikes/bikeApi";
import { TBike } from "../../Type/BikeType";

import LoaderSpinner from "../../utilities/LoaderSpinner";
import Card from "../../components/UI/Card";

const AvailableBikeSection = () => {
  // Fetch the available bikes
  const { data, isLoading } = useGetAvailableBikeQuery(undefined);

  // Display loading state while fetching
  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  return (
    <div className="pt-20 min-h-screen dark:bg-base-100 bg-gray-700 px-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-300 dark:text-slate-800">
          Available Bikes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render bikes if data is available */}
          {data?.data?.map((item: TBike, index: number) => (
            <Card key={index} {...item}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableBikeSection;
