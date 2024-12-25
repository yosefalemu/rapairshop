import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema/tickets";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: (schema) => schema.uuid("Invalid UUID format").optional(),
  title: (schema) => schema.min(1, "Title is required"),
  description: (schema) => schema.min(1, "Description is required"),
  tech: (schema) =>
    schema.min(1, "Tech is required").email("Invalid email address"),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type selectTicketSchemaType = typeof selectTicketSchema._type;
