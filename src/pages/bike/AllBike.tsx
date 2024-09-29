import Acordion from "../../components/form/Acordion";
import { useState } from "react";
import { Button, Drawer, Alert, Checkbox, Modal } from "antd";
import CustomCard from "../../components/layouts/CustomCard";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { TBike } from "../../Type/BikeType";
import { useAllBikeQuery } from "../../redux/api/bikes/bikeApi";
import LoaderSpinner from "../../utilities/LoaderSpinner";

const AllBike = () => {
  // Fetching all bikes
  const {
    data: allBikesData,
    error: allBikesError,
    isLoading: allBikesLoading,
  } = useAllBikeQuery([]);
  const selectedItem = useAppSelector((state) => state?.bikesInfo?.item);
  const navigate = useNavigate();

  const [selectedBikes, setSelectedBikes] = useState<TBike[]>([]);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);

  const handleClick = (id: string) => {
    navigate(`/bike-details/${id}`);
  };

  let filterItem;
  if (selectedItem?.brand) {
    filterItem = { name: "brand", value: selectedItem.brand };
  } else if (selectedItem?.model) {
    filterItem = { name: "model", value: selectedItem.model };
  }

  // Fetching filtered bikes
  const { data: filteredData, isLoading: filteredLoading } = useAllBikeQuery(
    filterItem ? [filterItem] : []
  );

  // Determine which data to use (filtered or all bikes)
  const bikeData =
    filteredData?.data?.result || allBikesData?.data?.result || [];

  // Managing the drawer visibility for small screens
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Extract unique brands and models for filtering
  const brands = [
    ...new Set(
      allBikesData?.data?.result?.map((el: TBike) => el?.brand as string)
    ),
  ] as string[];
  const models = [
    ...new Set(
      allBikesData?.data?.result?.map((el: TBike) => el?.model as string)
    ),
  ] as string[];

  // Handling loading and error states
  if (allBikesLoading || filteredLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (allBikesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          message="Error"
          description="Failed to fetch bike data."
          type="error"
        />
      </div>
    );
  }

  // Handling bike selection for comparison
  const handleBikeSelection = (bike: TBike, checked: boolean) => {
    if (checked) {
      setSelectedBikes((prev) => [...prev, bike]);
    } else {
      setSelectedBikes((prev) =>
        prev.filter((selectedBike) => selectedBike?._id !== bike?._id)
      );
    }
  };

  const handleCompare = () => {
    if (selectedBikes.length >= 2) {
      setIsComparisonVisible(true);
    } else {
      alert("Please select at least two bikes to compare.");
    }
  };

  const handleCloseComparison = () => {
    setIsComparisonVisible(false);
  };

  return (
    <div className="mx-4 md:mx-40">
      <div className="mt-10">
        {/* Flexbox grid container */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Accordions visible on large screens (md and above) */}
          <div className="md:w-1/4 hidden md:block">
            <Acordion
              names={brands}
              filterKey="brand"
              accordianFor="Brand"
              key="brand-accordion"
            />
            <Acordion
              names={models}
              filterKey="model"
              accordianFor="Model"
              key="model-accordion"
            />
            <Button
              type="primary"
              className="mt-4 w-full bg-green-700  text-white"
              onClick={handleCompare}
            >
              Compare Selected Bikes
            </Button>
          </div>

          {/* Drawer and Button for small screens (below md) */}
          <div className="md:hidden mb-4">
            <Button
              onClick={showDrawer}
              className="mb-4 w-full bg-green-700 text-white"
            >
              Filter Bikes
            </Button>
            <Drawer
              title="Filter Bikes"
              placement="left"
              onClose={onClose}
              open={open}
              bodyStyle={{ overflowY: "auto" }} // Ensures scrolling inside the drawer
            >
              <Acordion
                names={brands}
                filterKey="brand"
                accordianFor="Brand"
                key="drawer-brand-accordion"
              />
              <Acordion
                names={models}
                filterKey="model"
                accordianFor="Model"
                key="drawer-model-accordion"
              />
              <Button
                type="primary"
                className="mt-4 w-full bg-green-700  text-white"
                onClick={handleCompare}
              >
                Compare Selected Bikes
              </Button>
            </Drawer>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mt-3">
              <h1 className="mr-6 ml-6 p-3 text-center text-xl bg-slate-300">
                Total Items: {bikeData?.length}
              </h1>

              {bikeData?.map((bike: TBike) => (
                <div key={bike._id} className="relative">
                  <CustomCard
                    handleClick={() => handleClick(bike._id)}
                    buttonName="View Details"
                    data={bike}
                  />
                  <Checkbox
                    className="absolute top-4 left-8 text-white"
                    onChange={(e) =>
                      handleBikeSelection(bike, e.target.checked)
                    }
                  >
                    Compare
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Modal */}
        <Modal
          title="Bike Comparison"
          visible={isComparisonVisible}
          onCancel={handleCloseComparison}
          footer={null}
          width={800}
        >
          <div className="comparison-table p-4">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="px-4 py-2 border border-gray-200">Feature</th>
                  {selectedBikes?.map((bike) => (
                    <th
                      key={bike?._id}
                      className="px-4 py-2 border border-gray-200"
                    >
                      {bike?.model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-600 hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200 font-medium">
                    Brand
                  </td>
                  {selectedBikes.map((bike) => (
                    <td
                      key={bike?._id}
                      className="px-4 py-2 border border-gray-200"
                    >
                      {bike.brand}
                    </td>
                  ))}
                </tr>
                <tr className="text-gray-600 hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200 font-medium">
                    Engine Capacity
                  </td>
                  {selectedBikes?.map((bike) => (
                    <td
                      key={bike?._id}
                      className="px-4 py-2 border border-gray-200"
                    >
                      {bike.cc} cc
                    </td>
                  ))}
                </tr>
                <tr className="text-gray-600 hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200 font-medium">
                    Price
                  </td>
                  {selectedBikes?.map((bike) => (
                    <td
                      key={bike._id}
                      className="px-4 py-2 border border-gray-200"
                    >
                      ${bike.pricePerHour} / hour
                    </td>
                  ))}
                </tr>
                {/* Add more features here */}
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AllBike;
