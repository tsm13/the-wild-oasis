import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as updatePasswordAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordAPI,
    onSuccess: () => {
      toast.success("Password updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePassword, isUpdating };
}
