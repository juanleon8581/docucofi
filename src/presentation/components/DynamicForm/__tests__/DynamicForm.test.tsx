import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { DynamicForm } from "../DynamicForm";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";

const fields: TemplateFieldDefinition[] = [
  { name: "ciudad", label: "Ciudad", type: "text", defaultValue: "BOGOTÁ" },
  { name: "valor", label: "Valor", type: "number", defaultValue: "500" },
];

const fieldsWithDate: TemplateFieldDefinition[] = [
  ...fields,
  { name: "fecha", label: "Fecha", type: "date", dateMode: "single", defaultValue: "" },
];

describe("DynamicForm", () => {
  beforeEach(() => {
    useTemplateStore.setState({
      fields: { ciudad: "BOGOTÁ", valor: "500" },
    });
    cleanup();
    render(<DynamicForm fields={fields} />);
  });

  it("should render a form element", () => {
    expect(screen.getByTestId("dynamic-form")).toBeInTheDocument();
  });

  it("should render a labeled input for each field", () => {
    expect(screen.getByLabelText("Ciudad")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor")).toBeInTheDocument();
  });

  it("should display the current store value in each input", () => {
    expect(screen.getByTestId("field-ciudad")).toHaveValue("BOGOTÁ");
    expect(screen.getByTestId("field-valor")).toHaveValue(500);
  });

  it("should render number input for number fields", () => {
    expect(screen.getByTestId("field-valor")).toHaveAttribute("type", "number");
  });

  it("should render text input for text fields", () => {
    expect(screen.getByTestId("field-ciudad")).toHaveAttribute("type", "text");
  });

  it("should call setFieldValue when typing in an input", async () => {
    const input = screen.getByTestId("field-ciudad");
    await userEvent.clear(input);
    await userEvent.type(input, "Medellín");
    expect(useTemplateStore.getState().fields["ciudad"]).toBe("Medellín");
  });
});

describe("DynamicForm with date field", () => {
  it("renders a DatePicker for fields with type 'date'", () => {
    useTemplateStore.setState({
      fields: { ciudad: "BOGOTÁ", valor: "500", fecha: "" },
    });
    render(<DynamicForm fields={fieldsWithDate} />);
    expect(screen.getByTestId("field-fecha")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha")).toBeInTheDocument();
  });
});
