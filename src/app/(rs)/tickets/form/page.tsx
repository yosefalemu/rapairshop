import * as Sentry from "@sentry/nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import BackButton from "@/components/BackButton";
import { getCustomers } from "@/lib/queries/getCustomers";
import { getTickets } from "@/lib/queries/getTickets";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;
    console.log(managerPermission, user);
    // New ticket form
    if (customerId) {
      const customer = await getCustomers(customerId);

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} techs={techs} />;
      }

      // return ticket form
      return <TicketForm customer={customer} />;
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTickets(ticketId);

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomers(ticket.customerId);
      if (isManager) {
        KindeInit();
        const { users } = await Users.getUsers();
        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable = user?.email === ticket.tech;
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
