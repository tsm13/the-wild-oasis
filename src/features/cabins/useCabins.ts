import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { ICabin } from "./cabin-interface";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery<ICabin[], Error>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
}
