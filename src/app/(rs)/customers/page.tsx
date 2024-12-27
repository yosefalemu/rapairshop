import { getCustomersSearchResults } from "@/lib/queries/getCustomersSearchResults";
import CusotomSearch from "./CustomerSearch";
import { getCustomers } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  //DISPLAY ALL THE CUSTOMERS
  if (!searchText) {
    const allCustomers = await getCustomers();
    return (
      <>
        <CusotomSearch />
        {allCustomers.length === 0 && (
          <p className="text-red-500">No customers found</p>
        )}
        {allCustomers.length > 0 && <CustomerTable data={allCustomers} />}
      </>
    );
  }
  //SEARCH CUSTOMERS
  const spanForGetCustomersSearchResults = Sentry.startInactiveSpan({
    name: "getCustomersSearchResults-1",
  });
  const searchedCustomers = await getCustomersSearchResults(searchText);
  spanForGetCustomersSearchResults.end();

  return (
    <>
      <CusotomSearch />
      {searchedCustomers.length === 0 && (
        <p className="text-red-500">No customers found</p>
      )}
      {searchedCustomers.length > 0 && (
        <CustomerTable data={searchedCustomers} />
      )}
    </>
  );
}
