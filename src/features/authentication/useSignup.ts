import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please check the entered email to verify the account."
      );
    },
  });

  return { signup, isLoading };
}
