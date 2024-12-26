import { getTickets } from "@/lib/queries/getTickets";
import TicketSearch from "./TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketsSearchResult";

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText) {
    const allTickets = await getTickets();
    return (
      <>
        <TicketSearch />
        {allTickets.length === 0 && (
          <p className="text-red-500">No tickets found</p>
        )}
        {allTickets.length > 0 && <p>{JSON.stringify(allTickets)}</p>}
      </>
    );
  }
  const searchedTickets = await getTicketSearchResults(searchText);
  return (
    <>
      <TicketSearch />
      {searchedTickets.length === 0 && (
        <p className="text-red-500">No tickets found</p>
      )}
      {searchedTickets.length > 0 && <p>{JSON.stringify(searchedTickets)}</p>}
    </>
  );
}
