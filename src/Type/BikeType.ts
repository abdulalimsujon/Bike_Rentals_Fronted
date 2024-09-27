export type TBike = {
  _id: string;
  brand: string;
  pricePerHour: number;
  isAvailable: boolean;
  name: string;
  cc: number;
  description: string;
  year: number;
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
