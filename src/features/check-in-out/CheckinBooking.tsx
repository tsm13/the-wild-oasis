import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isPending: isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(Boolean(booking?.isPaid)), [booking]);

  if (!booking || !settings) {
    return null;
  }

  if (isLoading || isLoadingSettings) <Spinner />;

  const optionalBreakfastprice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastprice,
          totalPrice: booking.totalPrice + optionalBreakfastprice,
        },
      });
    } else {
      checkin({ bookingId: booking.id, breakfast: {} });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastprice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.guests.fullName} has paid the total of{" "}
          {!addBreakfast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(
                booking.totalPrice + optionalBreakfastprice
              )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                optionalBreakfastprice
              )})
            
          `}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          $variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid}
        >
          Check in booking #{booking.id}
        </Button>
        <Button $variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
