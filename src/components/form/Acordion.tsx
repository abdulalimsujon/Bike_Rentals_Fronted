import { Collapse, CollapseProps } from "antd";
import { useDispatch } from "react-redux";
import {
  setBrand,
  setFilter,
  setModel,
} from "../../redux/features/bikes/bikeSlice";
import { useState } from "react";

interface AcordionProps {
  names: string[];
  accordianFor: string;
  filterKey: "model" | "brand"; // Accepts either "model" or "brand"
}

const Acordion = ({ names, accordianFor, filterKey }: AcordionProps) => {
  const dispatch = useDispatch();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const handleNameClick = (name: string) => {
    setSelectedName(name);
    if (filterKey === "model") {
      dispatch(setModel(name));
    }
    if (filterKey === "brand") {
      dispatch(setBrand(name));
    }
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <span className="w-14 text-green-300 text-xl font-bold dark:text-green-700">
          {accordianFor}
        </span>
      ),
      children: (
        <div>
          {names?.map((name) => (
            <div
              key={name}
              className="text-green-700 text-lg dark:bg-slate-100 bg-slate-300"
            >
              <p
                className={`cursor-pointer py-2 px-4 my-2 rounded transition ease-in-out ${
                  selectedName === name
                    ? "font-bold text-blue-600"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleNameClick(name)}
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log("Active Panel Key:", key);
  };

  return (
    <div className="w-full my-3">
      <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
    </div>
  );
};

export default Acordion;
