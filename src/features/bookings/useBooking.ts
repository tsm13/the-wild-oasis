import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IBookingDetails } from "./interface";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery<IBookingDetails, Error>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });
  return { isLoading, booking, error };
}
