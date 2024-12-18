import { db } from "@/db";
import { tickets } from "@/db/schema/tickets";
import { eq } from "drizzle-orm";

export async function getTickets(id: string) {
  const ticketFound = await db.select().from(tickets).where(eq(tickets.id, id));
  return ticketFound[0];
}
