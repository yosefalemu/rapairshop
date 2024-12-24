import BackButton from "@/components/BackButton";
import { getCustomers } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId)
    return { title: "New customer", description: "Create a new customer" };

  return {
    title: `Edit customer #${customerId}`,
    description: `Edit customer #${customerId}`,
  };
}

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
        return (
          <>
            <CustomerForm customer={customer} />
          </>
        );
      }
    } else {
      return (
        <>
          <CustomerForm />
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
