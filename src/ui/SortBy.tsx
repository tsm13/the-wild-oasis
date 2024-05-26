import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { ChangeEvent } from "react";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
}

export default function SortBy({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
