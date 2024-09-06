import Acordion from "../../components/form/Acordion";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { useGetAllBikeQuery } from "../../redux/api/baseApi";
import { useGetBikebyModelQuery } from "../../redux/features/bikeApi";
import CustomCard from "../../components/layouts/CustomCard";

const AllBike = () => {
  const { data, error, isLoading } = useGetAllBikeQuery(undefined);
  const { data: bikeData } = useGetBikebyModelQuery("R1");
  console.log("bbb", bikeData);

  const [open, setOpen] = useState(false);

  const brands = [...new Set(data?.data?.map((el) => el.brand as string))];
  const models = [...new Set(data?.data?.map((el) => el.model as string))];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="mx-40">
      <div className="container mt-16 ">
        <div className="grid grid-cols-12 h-screen gap-3">
          {/* Accordions visible on large screens (md and above) */}
          <div className="col-span-4 hidden md:block ">
            <div className="relative">
              <Acordion names={brands} accordianFor="Brand" />
              <Acordion names={models} accordianFor="Model" />
            </div>
          </div>

          {/* Drawer and Button for small screens (below md) */}
          <div className="col-span-12 md:hidden mb-4">
            <Button type="primary" onClick={showDrawer} className="mb-4 w-full">
              Filter Bikes
            </Button>
            <Drawer
              title="Filter Bikes"
              placement="left"
              onClose={onClose}
              open={open}
            >
              <Acordion names={brands} accordianFor="Brand" />
              <Acordion names={models} accordianFor="Model" />
            </Drawer>
          </div>

          {/* Content Section */}
          <div className="col-span-12 md:col-span-8">
            {bikeData?.data?.map((item) => (
              <CustomCard key={item.id} data={item}></CustomCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBike;
