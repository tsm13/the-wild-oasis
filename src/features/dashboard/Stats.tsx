import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { IDashboardBooking, IDashboardStay } from "./interface";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  bookings: IDashboardBooking[] | undefined;
  confirmedStays: IDashboardStay[] | undefined;
  numDays: number;
  cabinCount: number;
};

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: Props) {
  const numBookings = bookings?.length || 0;

  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0) || 0;

  const checkins = confirmedStays?.length || 0;

  const occupation = confirmedStays
    ? confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
      (numDays * cabinCount)
    : 0;
  // NOTE: occupation: num checked in nights / all available nights (nights = num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
