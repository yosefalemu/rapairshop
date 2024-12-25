"use client";
import { useState } from "react";

type Props = {
  result: {
    data?: {
      message: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
  onReset: () => void;
};

const MessageBox = ({
  type,
  content,
  onReset,
}: {
  type: "success" | "error";
  content: React.ReactNode;
  onReset?: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleAnimationEnd = () => {
    setIsVisible(false);
    onReset?.();
  };

  if (!isVisible) return null;
  return (
    <div
      className={`bg-accent px-4 py-3 my-2 relative border-red-500 ${
        type === "error" ? "text-red-500" : "text-green-500"
      }`}
    >
      {type === "success" ? "🎉" : "🚨"} {content}
      <div
        className={`absolute bottom-0 left-0 h-1 animate-shrinkBar ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
        onAnimationEnd={handleAnimationEnd}
      ></div>
    </div>
  );
};

function mapErrorToMessage(error: string): string {
  if (
    error
      .toLowerCase()
      .includes("duplicate key value violates unique constraint") &&
    error.toLowerCase().includes("email")
  ) {
    return "Email already exists. Please use a different email.";
  }
  if (
    error
      .toLowerCase()
      .includes("duplicate key value violates unique constraint") &&
    error.toLowerCase().includes("phone")
  ) {
    return "Phone number already exists. Please use a different phone number.";
  }
  if (
    error.toLowerCase().includes("error connecting to database: fetch failed")
  ) {
    return "Network error. Please check your connection.";
  }

  const errorMessages: Record<string, string> = {
    "violates foreign key constraint":
      "Invalid reference. Please check your input.",
    "null value in column": "A required field is missing. Please fill it in.",
    "invalid input syntax": "Invalid input format. Please correct your data.",
    default: "An unexpected error occurred. Please try again later.",
  };

  for (const key in errorMessages) {
    if (error.toLowerCase().includes(key.toLowerCase())) {
      return errorMessages[key];
    }
  }

  return errorMessages.default;
}

export function DisplayServerActionResponse({ result, onReset }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && (
        <MessageBox
          type="success"
          content={`Success: ${data.message}`}
          onReset={onReset}
        />
      )}
      {serverError && (
        <MessageBox
          type="error"
          content={mapErrorToMessage(serverError)}
          onReset={onReset}
        />
      )}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map(
            (key) => (
              console.log("THE KEY FOUND ON THE KEY", key),
              (
                <p key={key}>{`${key}: ${
                  validationErrors[key as keyof typeof validationErrors]?.join(
                    ", "
                  ) || "Invalid input"
                }`}</p>
              )
            )
          )}
          onReset={onReset}
        />
      )}
    </div>
  );
}
