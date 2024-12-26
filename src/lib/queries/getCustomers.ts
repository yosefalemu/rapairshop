import { db } from "@/db";
import { customers } from "@/db/schema/customers";

export async function getCustomers() {
  const allCustomers = await db.select().from(customers);
  return allCustomers;
}
