"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { tickets } from "@/db/schema/tickets";
import { actionClient } from "@/lib/next-safe-action";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from "@/zod-schemas/tickets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) redirect("/login");
      if (!ticket.id) {
        const newTicket = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({ insertedId: tickets.id });
        return {
          message: `Ticket ID #${newTicket[0].insertedId} created successfully`,
        };
      }
      const updatedTicket = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
          completed: ticket.completed,
        })
        .where(eq(tickets.id, ticket.id))
        .returning({ updatedId: tickets.id });
      return {
        message: `Ticket ID #${updatedTicket[0].updatedId} updated successfully`,
      };
    }
  );
