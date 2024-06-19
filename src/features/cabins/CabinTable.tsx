import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { ICabin, ICabinKeys } from "./interface";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // Filtering:
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  // Sorting:
  const sortByValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByValue.split("-") as [
    ICabinKeys,
    "asc" | "desc"
  ];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (typeof a[field] === "string") {
      return (a[field] as string).localeCompare(b[field] as string) * modifier;
    } else {
      return ((a[field] as number) - (b[field] as number)) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
        <Table.Header>
          <>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </>
        </Table.Header>
        <Table.Body<ICabin>
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
