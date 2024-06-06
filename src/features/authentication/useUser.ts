import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { User } from "./interface";

export function useUser() {
  const { data: user, isPending: isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
