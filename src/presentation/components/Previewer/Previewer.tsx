"use client";

import {
  ScrollArea,
  ScrollBar,
} from "@/presentation/components/ui/scroll-area";

import "@/presentation/styles/preview.css";

interface Props {
  children: React.ReactNode;
}

export const Previewer = ({ children }: Props) => {
  return (
    <ScrollArea
      className="aspect-[1/1.414] max-w-4/5 rounded-sm border bg-popover p-4 shadow-2xl hover:bg-sidebar md:w-8/12 landscape:h-full"
      data-testid="previewer-container"
    >
      {children}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
