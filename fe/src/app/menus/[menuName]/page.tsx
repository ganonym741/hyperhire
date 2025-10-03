"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/molecules/Breadcrumb";

const WelcomePage = () => {
  const params = useParams();
  const menuName = params.menuName as string;

  // Convert URL-friendly name back to readable name
  const displayName =
    menuName?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "";

  return (
    <div className="space-y-6">
      <Breadcrumb items={["System Management", displayName]} />

      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to {displayName}
        </h1>
        <p className="text-lg text-muted-foreground">
          This page is under construction
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
