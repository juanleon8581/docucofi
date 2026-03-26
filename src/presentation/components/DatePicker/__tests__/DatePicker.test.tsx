import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "../DatePicker";

describe("DatePicker", () => {
  it("renders trigger with placeholder when value is empty", () => {
    render(
      <DatePicker value="" onChange={vi.fn()} placeholder="Selecciona una fecha" />
    );
    expect(screen.getByText("Selecciona una fecha")).toBeInTheDocument();
  });

  it("single mode: shows formatted date in trigger when value is set", () => {
    render(<DatePicker value="2026-03-23" onChange={vi.fn()} dateMode="single" />);
    expect(screen.getByText("23 de marzo de 2026")).toBeInTheDocument();
  });

  it("multiple mode: shows 'N fechas seleccionadas' when values are set", () => {
    render(
      <DatePicker
        value="2026-03-23,2026-03-24"
        onChange={vi.fn()}
        dateMode="multiple"
      />
    );
    expect(screen.getByText("2 fechas seleccionadas")).toBeInTheDocument();
  });

  it("multiple mode: shows '1 fecha seleccionada' for a single date", () => {
    render(
      <DatePicker value="2026-03-23" onChange={vi.fn()} dateMode="multiple" />
    );
    expect(screen.getByText("1 fecha seleccionada")).toBeInTheDocument();
  });

  it("multiple mode: shows placeholder when value is empty", () => {
    render(
      <DatePicker
        value=""
        onChange={vi.fn()}
        dateMode="multiple"
        placeholder="Elige fechas"
      />
    );
    expect(screen.getByText("Elige fechas")).toBeInTheDocument();
  });
});
