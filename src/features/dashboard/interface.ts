export interface IDashboardBooking {
  createdAt: string;
  totalPrice: number;
  extrasPrice: number;
}

export interface IDashboardStay {
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
