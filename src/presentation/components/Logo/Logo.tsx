import { cn } from "@/presentation/lib/utils";
import Link from "next/link";
import { DocuCofiLogo } from "./docuCofiLogo";

interface Props {
  orientation?: "horizontal" | "vertical";
  dataTestId?: string;
}

export const Logo: React.FC<Props> = ({
  orientation = "horizontal",
  dataTestId = "logo-container",
}) => {
  const isDefaultOrientation = orientation === "horizontal";
  return (
    <Link
      href="/"
      data-testid={dataTestId}
      className={cn(
        "flex gap-2 font-bold",
        isDefaultOrientation
          ? "  items-end "
          : " flex-col items-center justify-center",
      )}
    >
      <DocuCofiLogo testId="logo-svg" className="w-10 h-10 md:w-15 md:h-15" />
      <span data-testid="logo-text" className="text-lg md:text-2xl">
        DocuCofi
      </span>
    </Link>
  );
};
