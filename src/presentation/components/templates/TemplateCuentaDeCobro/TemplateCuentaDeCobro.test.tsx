import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TemplateCuentaDeCobro } from "./TemplateCuentaDeCobro";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";

describe("TemplateCuentaDeCobro.test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTemplateStore.setState({ fields: {} });
    cleanup();
    render(<TemplateCuentaDeCobro />);
  });

  describe("container", () => {
    it("should render the template container", () => {
      const container = screen.getByTestId("template-cdc-container");
      expect(container).toBeInTheDocument();
    });

    it("should have the correct styles", () => {
      const expectedClassList = [
        "template-container",
        "h-full",
        "justify-between",
        "pb-4",
        "landscape:px-4",
        "landscape:pr-0",
      ];
      const container = screen.getByTestId("template-cdc-container");
      const classList = container.classList;

      expect(classList.length).toBe(expectedClassList.length);
      expectedClassList.forEach((t) => {
        expect(classList).toContain(t);
      });
    });

    it("should have the correct children", () => {
      const container = screen.getByTestId("template-cdc-container");
      const children = container.children as HTMLCollectionOf<HTMLElement>;
      expect(children.length).toBe(2);
      expect(children[0].dataset.testid).toBe("cp-container");
      expect(
        children[1].querySelector('[data-testid="previewer-container"]'),
      ).toBeTruthy();
    });
  });

  describe("DynamicForm", () => {
    it("should render the dynamic form inside CollapsiblePanel after opening", async () => {
      await userEvent.click(screen.getByTestId("cp-trigger"));
      expect(screen.getByTestId("dynamic-form")).toBeInTheDocument();
    });

    it("should render all field inputs after opening panel", async () => {
      await userEvent.click(screen.getByTestId("cp-trigger"));
      expect(screen.getByTestId("field-ciudad")).toBeInTheDocument();
      expect(screen.getByTestId("field-fecha")).toBeInTheDocument();
      expect(screen.getByTestId("field-empresa")).toBeInTheDocument();
      expect(screen.getByTestId("field-nit")).toBeInTheDocument();
      expect(screen.getByTestId("field-nombre")).toBeInTheDocument();
      expect(screen.getByTestId("field-cc")).toBeInTheDocument();
      expect(screen.getByTestId("field-valor")).toBeInTheDocument();
      expect(screen.getByTestId("field-valorEnLetras")).toBeInTheDocument();
      expect(screen.getByTestId("field-concepto")).toBeInTheDocument();
      expect(screen.getByTestId("field-numeroCuenta")).toBeInTheDocument();
      expect(screen.getByTestId("field-banco")).toBeInTheDocument();
    });
  });

  describe("preview", () => {
    it("should show default field values in the preview", () => {
      expect(screen.getByTestId("previewer-container")).toBeInTheDocument();
      expect(
        screen.getByTestId("previewer-container").textContent,
      ).toContain("INSERTE CIUDAD");
      expect(
        screen.getByTestId("previewer-container").textContent,
      ).toContain("INSERTE EMPRESA S.A.S");
    });

    it("should reflect store values in the preview when store is updated", async () => {
      await act(async () => {
        useTemplateStore.getState().setFieldValue("ciudad", "Medellín");
        useTemplateStore.getState().setFieldValue("empresa", "Mi Empresa SAS");
        useTemplateStore.getState().setFieldValue("nombre", "Juan Pérez");
      });

      const preview = screen.getByTestId("previewer-container");
      expect(preview.textContent).toContain("Medellín");
      expect(preview.textContent).toContain("Mi Empresa SAS");
      expect(preview.textContent).toContain("Juan Pérez");
    });
  });
});
