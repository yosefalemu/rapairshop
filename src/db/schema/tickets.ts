import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  title: varchar("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  tech: varchar("tech").notNull().default("unassigned"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const ticketsRealtion = relations(tickets, ({ one }) => ({
  customers: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
