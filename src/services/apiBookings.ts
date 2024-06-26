import { RESULTS_PER_PAGE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface GetBookingsParams {
  filter: {
    field: string;
    value: string;
    method?: "lte" | "gte";
  } | null;

  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
}

export async function getBookings({ filter, sortBy, page }: GetBookingsParams) {
  let query = supabase
    .from("bookings")
    .select(
      "id, createdAt, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  if (page) {
    const from = (page - 1) * RESULTS_PER_PAGE;
    const to = from + RESULTS_PER_PAGE - 1;
    query = query.range(from, to);
  }
  if (filter)
    // Filtering the query:
    query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to load bookings");
  }

  return { data, count } as any;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("createdAt, totalPrice, extrasPrice")
    .gte("createdAt", date)
    .lte("createdAt", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Failed to load bookings");
  }

  return data;
}

export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Failed to load bookings");
  }

  return data;
}

// Activity = check in/out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("createdAt");

  // Equivalent to this:
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Failed to load bookings.");
  }
  return data;
}

export async function updateBooking(id: number, obj: object) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to update booking");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete booking");
  }
  return data;
}
