import { db } from "@/db";
import { tickets } from "@/db/schema/tickets";

export async function getTickets() {
  const allTickets = await db.select().from(tickets);
  return allTickets;
}
