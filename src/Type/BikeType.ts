export type TBike = {
  _id: string;
  brand: string;
  pricePerHour: number | string;
  isAvailable: boolean;
  name: string;
  cc: number | string;
  description: string;
  year: number | string;
  model: string;
  image?: File;
};

export type TReturnBike = {
  _id: string;
  bikeId: string;
  userId: string;
  startTime: string;
  returnTime: string;
  totalCost: number;
  isReturned: boolean;
  name?: string;
};
