import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Bike {
  _id: string;
  brand: string;
  pricePerHour: number | string;
  isAvailable: boolean;
  name: string;
  cc: number | string;
  description: string;
  year: number | string;
  model: string;
  image?: File | string;
}

type TbonusCoupons = {
  code: string;
  value: number;
};

interface BikeState {
  item: Bike; // This should be a single bike object
  selectItem: Bike[]; // This should be an array of Bike objects
  bonus: TbonusCoupons;
}

const initialState: BikeState = {
  item: {
    _id: "",
    model: "",
    brand: "",
    name: "",
    pricePerHour: "",
    description: "",
    isAvailable: true,
    year: 0,
    cc: 0,
    image: "",
  },
  selectItem: [], // Initialize selectItem as an empty array
  bonus: {
    code: "",
    value: 0,
  },
};

export const bikeSlice = createSlice({
  name: "bikesInfo",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<string>) => {
      state.item.model = action.payload;
      state.item.brand = ""; // Clear brand when model is set
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.item.brand = action.payload;
      state.item.model = ""; // Clear model when brand is set
    },
    setItem: (state, action: PayloadAction<Bike>) => {
      state.selectItem.push(action.payload); // Push the new item into the array
    },
    setBonus: (state, action) => {
      state.bonus.code = action.payload.code;
      state.bonus.value = action.payload.value;
    },
  },
});

export const { setModel, setBrand, setItem, setBonus } = bikeSlice.actions;
export default bikeSlice.reducer;
