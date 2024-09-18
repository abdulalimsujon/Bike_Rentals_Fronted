import { createSlice } from "@reduxjs/toolkit";

type TRental = {
  _id: string;
  startTime: string;
}[];

const rentalBike: TRental = [];

const rentSlice = createSlice({
  name: "rent",
  initialState: rentalBike,
  reducers: {
    rentPeriodWithBike: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { rentPeriodWithBike } = rentSlice.actions;
export default rentSlice.reducer;
