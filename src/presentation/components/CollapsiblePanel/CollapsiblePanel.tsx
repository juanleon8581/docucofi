import { ArrowBigDownDash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import "@/presentation/styles/collapsiblePanel.css";

interface Props {
  children: React.ReactNode;
}

export const CollapsiblePanel = ({ children }: Props) => {
  return (
    <Collapsible
      data-testid="cp-container"
      className="cp-container mx-auto flex min-h-10 w-11/12 flex-col gap-2 rounded-b-3xl bg-primary p-2 text-primary-foreground shadow-lg shadow-primary/50 md:w-4/5"
    >
      <CollapsibleTrigger
        data-testid="cp-trigger"
        className="cp-trigger-rotate flex items-center justify-center"
      >
        <ArrowBigDownDash />
      </CollapsibleTrigger>
      <CollapsibleContent
        data-testid="cp-content"
        className="cp-content flex flex-col items-center justify-center gap-2 pb-6"
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
