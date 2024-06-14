import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { IBookingDetails } from "../bookings/interface";

export function useTodayActivity() {
  const { data: activitiesToday, isPending: isLoading } = useQuery<
    IBookingDetails[]
  >({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { activitiesToday, isLoading };
}
