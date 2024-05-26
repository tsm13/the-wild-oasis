import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { IBooking } from "./interface";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Filtering:
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sorting:
  const sortByBeforeSplit = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByBeforeSplit.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery<IBooking[], Error>({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, bookings, error };
}
