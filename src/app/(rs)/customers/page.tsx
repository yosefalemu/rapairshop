import { getCustomersSearchResults } from "@/lib/queries/getCustomersSearchResults";
import CusotomSearch from "./CustomerSearch";
import { getCustomers } from "@/lib/queries/getCustomers";

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
        {allCustomers.length > 0 && <p>{JSON.stringify(allCustomers)}</p>}
      </>
    );
  }
  //SEARCH CUSTOMERS
  const searchedCustomers = await getCustomersSearchResults(searchText);
  return (
    <>
      <CusotomSearch />
      {searchedCustomers.length === 0 && (
        <p className="text-red-500">No customers found</p>
      )}
      {searchedCustomers.length > 0 && (
        <p>{JSON.stringify(searchedCustomers)}</p>
      )}
    </>
  );
}
