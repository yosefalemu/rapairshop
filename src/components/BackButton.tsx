"use client";

import { Button } from "./ui/button";

export default function BackButton() {
  return (
    <Button
      className="font-normal py-4 px-14 text-xl rounded"
      onClick={() => window.history.back()}
    >
      Back
    </Button>
  );
}
