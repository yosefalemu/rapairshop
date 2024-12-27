import { db } from "@/db";
import { customers } from "@/db/schema/customers";
import { tickets } from "@/db/schema/tickets";
import { eq } from "drizzle-orm";

export async function getTickets() {
  const allTickets = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .orderBy(tickets.createdAt);
  return allTickets;
}
