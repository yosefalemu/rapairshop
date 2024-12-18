"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({
  title,
  variant,
  className,
  ...props
}: Props) {
  const router = useRouter();
  return (
    <Button
      className={className}
      variant={variant}
      title={title}
      {...props}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
}
