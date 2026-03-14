import { cn } from "@/presentation/lib/utils";
import { CoffeeIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  orientation?: "horizontal" | "vertical";
}

export const Logo: React.FC<Props> = ({ orientation = "horizontal" }) => {
  const isDefaultOrientation = orientation === "horizontal";
  return (
    <Link
      href="/"
      data-testid="logo-container"
      className={cn(
        "flex gap-2 font-bold",
        isDefaultOrientation
          ? "  items-end "
          : " flex-col items-center justify-center",
      )}
    >
      <CoffeeIcon data-testid="logo-svg" className="w-10 h-10" />
      <span data-testid="logo-text">Coficode Auth</span>
    </Link>
  );
};
