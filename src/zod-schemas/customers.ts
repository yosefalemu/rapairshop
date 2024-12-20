import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema/customers";

export const insertCustomerSchema = createInsertSchema(customers, {
  id: (schema) => schema.uuid("Invalid UUID format").optional(),
  firstName: (schema) =>
    schema
      .nonempty("First name is required")
      .min(3, "First name should be at least 3 character"),
  lastName: (schema) =>
    schema
      .nonempty("Last name is required")
      .min(3, "Last name should be at least 3 character"),
  address1: (schema) =>
    schema
      .nonempty("Address is required")
      .min(3, "Address should be at least 3 character"),
  city: (schema) =>
    schema
      .nonempty("City is required")
      .min(3, "City name should be atleast 3 character"),
  state: (schema) =>
    schema
      .nonempty("State is required")
      .length(2, "State name should be 2 character"),
  email: (schema) =>
    schema.min(1, "Emaill address is required").email("Invalid email address"),
  zip: (schema) =>
    schema
      .nonempty("Zip code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Invalid zip code. Use XXXXX or XXXXX-XXXX"),
  phone: (schema) =>
    schema
      .nonempty("Phone number is required")
      .regex(
        /^\d{3}-\d{3}-\d{4}$/,
        "Invalid phone number format.Use  XXX-XXX-XXXX"
      ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
