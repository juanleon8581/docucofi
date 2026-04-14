import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { DynamicForm } from "../DynamicForm";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import type { TemplateFieldDefinition } from "@/domain/entities/TemplateField";

vi.mock("next/navigation", () => ({
  useParams: () => ({ lang: "es" }),
}));

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

describe("DynamicForm with file field", () => {
  it("renders a FileInput for fields with type 'file'", () => {
    const fieldsWithFile: TemplateFieldDefinition[] = [
      ...fields,
      { name: "signature", label: "Firma (imagen)", type: "file", defaultValue: "" },
    ];
    useTemplateStore.setState({
      fields: { ciudad: "BOGOTÁ", valor: "500", signature: "" },
    });
    render(<DynamicForm fields={fieldsWithFile} />);
    const input = screen.getByTestId("field-signature");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "file");
    expect(screen.getByLabelText("Firma (imagen)")).toBeInTheDocument();
  });
});

describe("DynamicForm with onToggleSaveField (update checkboxes)", () => {
  beforeEach(() => {
    cleanup();
  });

  const normalField: TemplateFieldDefinition = {
    name: "ciudad",
    label: "Ciudad",
    type: "text",
    defaultValue: "BOGOTÁ",
  };
  const disabledField: TemplateFieldDefinition = {
    name: "doc",
    label: "Doc",
    type: "text",
    defaultValue: "",
    disabledField: true,
  };
  const autoField: TemplateFieldDefinition = {
    name: "today",
    label: "Hoy",
    type: "date",
    defaultValue: "",
    isAuto: true,
    disabledField: true,
  };

  beforeEach(() => {
    useTemplateStore.setState({ fields: { ciudad: "BOGOTÁ", doc: "", today: "" } });
  });

  it("renders checkbox for normal field when onToggleSaveField provided", () => {
    render(
      <DynamicForm
        fields={[normalField]}
        selectedSaveFields={new Set()}
        onToggleSaveField={vi.fn()}
      />,
    );
    expect(screen.getByTestId("save-field-checkbox-ciudad")).toBeInTheDocument();
  });

  it("does not render checkbox for disabledField", () => {
    render(
      <DynamicForm
        fields={[disabledField]}
        selectedSaveFields={new Set()}
        onToggleSaveField={vi.fn()}
      />,
    );
    expect(screen.queryByTestId("save-field-checkbox-doc")).not.toBeInTheDocument();
  });

  it("does not render checkbox for isAuto field", () => {
    render(
      <DynamicForm
        fields={[autoField]}
        selectedSaveFields={new Set()}
        onToggleSaveField={vi.fn()}
      />,
    );
    expect(screen.queryByTestId("save-field-checkbox-today")).not.toBeInTheDocument();
  });

  it("does not render checkboxes when onToggleSaveField is not provided", () => {
    render(<DynamicForm fields={[normalField]} />);
    expect(screen.queryByTestId("save-field-checkbox-ciudad")).not.toBeInTheDocument();
  });

  it("calls onToggleSaveField with field name when checkbox clicked", async () => {
    const toggle = vi.fn();
    render(
      <DynamicForm
        fields={[normalField]}
        selectedSaveFields={new Set()}
        onToggleSaveField={toggle}
      />,
    );
    await userEvent.click(screen.getByTestId("save-field-checkbox-ciudad"));
    expect(toggle).toHaveBeenCalledWith("ciudad");
  });

  it("renders checkbox as checked when field is in selectedSaveFields", () => {
    render(
      <DynamicForm
        fields={[normalField]}
        selectedSaveFields={new Set(["ciudad"])}
        onToggleSaveField={vi.fn()}
      />,
    );
    expect(screen.getByTestId("save-field-checkbox-ciudad")).toBeChecked();
  });
});
