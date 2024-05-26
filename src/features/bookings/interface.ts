export interface IBooking {
  id: number;
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
