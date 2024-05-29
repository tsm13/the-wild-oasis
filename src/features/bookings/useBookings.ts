import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { IBooking } from "./interface";
import { RESULTS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // Pagination:
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Query:
  const {
    isLoading,
    data: { data: bookings, count } = {} as { data: IBooking[]; count: number }, // <- count : "exact" adds a delay
    error,
  } = useQuery<{ data: IBooking[]; count: number }, Error>({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching:
  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
