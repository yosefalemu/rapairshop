"use client"; // Error components must be Client Components

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>{`Something went wrong! ${error}`}</h2>
      <h1>ERROR PAGE</h1>
      <h1>{error.message}</h1>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
