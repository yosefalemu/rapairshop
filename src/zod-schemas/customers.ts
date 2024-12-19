import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema/customers";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.min(1, "State is required"),
  email: (schema) =>
    schema.min(1, "Emaill address is required").email("Invalid email address"),
  zip: (schema) =>
    schema.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid zip code. Use XXXXX or XXXXX-XXXX"
    ),
  phone: (schema) =>
    schema
      .min(1, "Phone number is required")
      .regex(
        /^\d{3}-\d{3}-\d{4}$/,
        "Invalid phone number format.Use  XXX-XXX-XXXX"
      ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
