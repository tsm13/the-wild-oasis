import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { LoginParams } from "../../services/interface";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoggingIn };
}
