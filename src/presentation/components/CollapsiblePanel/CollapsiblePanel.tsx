import { ArrowBigDownDash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import "@/presentation/styles/collapsiblePanel.css";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

export const CollapsiblePanel = ({ children }: Props) => {
  return (
    <Collapsible
      data-testid="cp-container"
      className="cp-container mx-auto flex min-h-10 w-11/12 flex-col gap-2 rounded-b-3xl bg-primary p-2 text-primary-foreground shadow-lg shadow-primary/50 md:mx-0 md:h-full md:w-auto md:min-w-10 md:flex-row-reverse md:rounded-l-3xl! md:rounded-b-none"
    >
      <CollapsibleTrigger
        data-testid="cp-trigger"
        className="cp-trigger-rotate flex items-center justify-center"
      >
        <ArrowBigDownDash />
      </CollapsibleTrigger>
      <CollapsibleContent
        data-testid="cp-content"
        className="cp-content flex flex-col items-center justify-center gap-2 overflow-hidden pb-6 md:pb-0 md:pl-4"
      >
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};
