import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo as updateUserInfoAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  const { mutate: updateUserInfo, isPending: isUpdating } = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: (user) => {
      toast.success("User information updated successfully");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUserInfo, isUpdating };
}
