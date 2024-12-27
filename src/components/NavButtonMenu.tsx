import type { LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

type Props = {
  icon: LucideIcon;
  label: string;
  choices: {
    title: string;
    href: string;
    titleIcon: LucideIcon;
  }[];
};
export default function NavButtonMenu({ icon: Icon, label, choices }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full focus:outline-none"
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-50 mt-[5px] border border-secondary-foreground/10 rounded-sm shadow-sm bg-primary-foreground w-28"
        align="end"
      >
        {choices.map((choice) => {
          const TitleIcon = choice.titleIcon;
          return (
            <DropdownMenuItem key={choice.title} asChild>
              <Link href={choice.href}>
                <TitleIcon />
                <span>{choice.title}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
