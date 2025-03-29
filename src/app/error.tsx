"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-rose-100">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold text-left text-gray-900">
            Something went wrong
          </h2>
          <p>{error.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Button onClick={reset} className="px-6 font-medium">
          Try again
        </Button>
        <Button asChild variant={"ghost"} className="px-6 font-medium">
          <Link href={"/"}>Go back</Link>
        </Button>
      </div>
    </div>
  );
};

export default error;
