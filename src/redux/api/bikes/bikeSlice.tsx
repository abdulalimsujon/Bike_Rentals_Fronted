import { createSlice } from "@reduxjs/toolkit";

interface BikeState {
  item: {
    model: string;
    brand: string;
  };
}

const initialState: BikeState = {
  item: {
    model: "",
    brand: "",
  },
};

export const bikeSlice = createSlice({
  name: "bikesInfo",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.item.model = action.payload;
      state.item.brand = "";
    },
    setBrand: (state, action) => {
      state.item.brand = action.payload;
      state.item.model = "";
    },
  },
});

export const { setModel, setBrand } = bikeSlice.actions;
export default bikeSlice.reducer;
