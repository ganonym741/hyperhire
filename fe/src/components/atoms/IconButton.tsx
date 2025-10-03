import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "ghost";
}

const IconButton = ({
  children,
  variant = "default",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={cn(
        "p-2 rounded-md transition-colors",
        variant === "default" &&
          "hover:bg-sidebar-hover text-sidebar-foreground",
        variant === "ghost" && "hover:bg-muted text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
