"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { DateAdapter } from "@/infrastructure/adapters/DateAdapter";
import { Button } from "@/presentation/components/ui/button";
import { Calendar } from "@/presentation/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover";
import { cn } from "@/presentation/lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  dateMode?: "single" | "multiple";
  placeholder?: string;
  id?: string;
  "data-testid"?: string;
}

export function DatePicker({
  value,
  onChange,
  dateMode = "single",
  placeholder = "Selecciona una fecha",
  id,
  "data-testid": dataTestId,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const triggerText = React.useMemo(() => {
    if (dateMode === "multiple") {
      const dates = DateAdapter.fromISOStringMultiple(value);
      if (dates.length === 0) return placeholder;
      return `${dates.length} fecha${dates.length === 1 ? "" : "s"} seleccionada${dates.length === 1 ? "" : "s"}`;
    }
    const date = DateAdapter.fromISOString(value);
    return date ? DateAdapter.formatDisplay(date) : placeholder;
  }, [value, dateMode, placeholder]);

  const hasValue = dateMode === "multiple"
    ? DateAdapter.fromISOStringMultiple(value).length > 0
    : DateAdapter.fromISOString(value) !== null;

  if (dateMode === "multiple") {
    const selectedDates = DateAdapter.fromISOStringMultiple(value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            data-testid={dataTestId}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !hasValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {triggerText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => {
              onChange(DateAdapter.toISOStringMultiple(dates ?? []));
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  const selectedDate = DateAdapter.fromISOString(value) ?? undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          data-testid={dataTestId}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !hasValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            onChange(date ? DateAdapter.toISOString(date) : "");
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
