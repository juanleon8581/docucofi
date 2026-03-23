import { ArrowBigDownDash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/presentation/lib/utils";

import "@/presentation/styles/collapsiblePanel.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CollapsiblePanel = ({ children, className }: Props) => {
  return (
    <Collapsible
      data-testid="cp-container"
      className={cn(
        "cp-container mx-auto flex min-h-10 w-11/12 flex-col gap-2 rounded-b-3xl bg-accent p-2 text-primary-foreground shadow-lg shadow-primary/50 landscape:mx-0 landscape:h-full landscape:w-auto landscape:min-w-10 landscape:flex-row-reverse landscape:rounded-l-3xl! landscape:rounded-b-none",
        className,
      )}
    >
      <CollapsibleTrigger
        data-testid="cp-trigger"
        className="cp-trigger-rotate flex items-center justify-center"
      >
        <ArrowBigDownDash />
      </CollapsibleTrigger>
      <CollapsibleContent
        data-testid="cp-content"
        className="cp-content mx-auto flex w-3/5 flex-col items-center justify-center gap-2 overflow-hidden pb-6 landscape:pb-0 landscape:pl-4"
      >
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};
