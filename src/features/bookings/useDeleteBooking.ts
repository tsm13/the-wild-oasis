import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success("Booking successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingBooking, deleteBooking };
}
