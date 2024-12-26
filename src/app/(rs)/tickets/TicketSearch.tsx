import Form from "next/form";
import SearchButton from "@/components/SearchButton";
import { Input } from "@/components/ui/input";

export default async function TicketSearch() {
  return (
    <Form action="/tickets" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Ticket"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
