import BackButton from "@/components/BackButton";
import { getCustomers } from "@/lib/queries/getCustomers";
import { getTickets } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";

export default async function TicketsFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;
    if (!customerId && !ticketId) {
      return (
        <>
          <h1 className="text-2xl mb-2">
            Ticket Id or Customer Id is required
          </h1>
          <BackButton title="Go Back" variant="link" />
        </>
      );
    }
    if (customerId) {
      const customer = await getCustomers(customerId);
      if (!customer) {
        return (
          <>
            <h1 className="text-2xl mb-2">
              There is no customer with id {customerId} is not found
            </h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h1 className="text-2xl mb-2">
              Customer with id {customerId} is not active
            </h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      }
      //RETURN TICKET FROM TO ASSIGN TO THE SPECIFIC CUSTOMETR
      console.log("customer", customer);
    }
    if (ticketId) {
      const ticket = await getTickets(ticketId);
      if (!ticket) {
        return (
          <>
            <h1 className="text-2xl mb-2">
              There is no ticket with id {ticketId} is not found
            </h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      }
      const customer = await getCustomers(ticket.customerId);
      if (!customer) {
        return (
          <>
            <h1 className="text-2xl mb-2">
              There is no customer with id {ticket.customerId} is not found
            </h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h1 className="text-2xl mb-2">
              Customer with id {ticket.customerId} is not active
            </h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      }
      //RETURN TICKET FORM TO UPDATE THE TICKET FOR THR SPECIFIC CUSTOMETR
      console.log("ticket", ticket);
      console.log("customer", customer);
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw new Error(error.message);
    }
  }
}
