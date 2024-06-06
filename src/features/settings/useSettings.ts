import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { ISettings } from "./interface";

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery<ISettings, Error>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}
