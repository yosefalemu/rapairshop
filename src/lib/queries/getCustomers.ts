import { db } from "@/db";
import { customers } from "@/db/schema/customers";
import { eq } from "drizzle-orm";

export async function getCustomers(id: string) {
  const customerFound = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  return customerFound[0];
}
