export interface IBooking {
  id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalPrice: number;
  cabins: {
    name: string;
  };
  guests: {
    email: string;
    fullName: string;
  };
}

// REVIEW:
// https://github.com/TanStack/query/discussions/5800

export interface IBookingDetails {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  cabins: {
    id: number;
    name: string;
    image: string;
    discount: number;
    createdAt: string;
    description: string;
    maxCapacity: number;
    regularPrice: number;
  };
  guests: {
    id: number;
    email: string;
    fullName: string;
    createdAt: string;
    nationalID: string;
    countryFlag: string;
    nationality: string;
  };
}
