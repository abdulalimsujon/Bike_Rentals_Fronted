import Acordion from "../../components/form/Acordion";
import { useState } from "react";
import { Button, Drawer, Spin, Alert } from "antd";

import CustomCard from "../../components/layouts/CustomCard";
import { useAppSelector } from "../../redux/hooks";
import { useAllBikeQuery } from "../../redux/features/bikes/bikeApi";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/authSlice";

const AllBike = () => {
  // Fetching all bikes
  const {
    data: allBikesData,
    error: allBikesError,
    isLoading: allBikesLoading,
  } = useAllBikeQuery([]);
  const selectedItem = useAppSelector((state) => state.bikesInfo.item);

  const user = useAppSelector(selectCurrentUser);

  console.log(allBikesData);

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/${user?.role}/bike-details/${id}`);
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
    ...new Set(allBikesData?.data?.result?.map((el) => el.brand as string)),
  ];
  const models = [
    ...new Set(allBikesData?.data?.result?.map((el) => el.model as string)),
  ];

  // Handling loading and error states
  if (allBikesLoading || filteredLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Loading bikes..." />
      </div>
    );
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

  return (
    <div className="mx-4 md:mx-40">
      <div className="mt-16">
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
          </div>

          {/* Drawer and Button for small screens (below md) */}
          <div className="md:hidden mb-4">
            <Button type="primary" onClick={showDrawer} className="mb-4 w-full">
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
            </Drawer>
          </div>

          {/* Content Section (Always full width on small screens, 3/4 width on large) */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mt-3">
              <h1 className="mr-6 ml-6 p-3 text-center text-xl bg-slate-300">
                Total Items: {bikeData.length}
              </h1>
              {bikeData?.map((bike) => (
                <CustomCard
                  key={bike.id}
                  handleClick={() => handleClick(bike._id)}
                  buttonName="View Details"
                  data={bike}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBike;
