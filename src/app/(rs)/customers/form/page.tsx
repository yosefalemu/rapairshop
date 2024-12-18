import BackButton from "@/components/BackButton";
import { getCustomers } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;
    if (customerId) {
      const customer = await getCustomers(customerId);
      if (!customer) {
        return (
          <>
            <h1>There is no customer with id {customerId} is not found</h1>
            <BackButton title="Go Back" variant="link" />
          </>
        );
      } else {
        console.log("customer", customer);
        return (
          <>
            <h1>Customer Edit Form Page</h1>
          </>
        );
      }
    } else {
      return (
        <>
          <h1>Customer Create Form Page</h1>
        </>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw new Error(error.message);
    }
  }
}
