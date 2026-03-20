import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TemplateCard } from "./TemplateCard";

describe("TemplateCard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cleanup();
    render(
      <TemplateCard
        title="title"
        description="description"
        buttonText="View Template"
        href="/templates"
        locale="es"
      />,
    );
  });

  it("should render the container", () => {
    const container = screen.getByTestId("template-card-container");
    expect(container).toBeInTheDocument();
  });

  describe("CardHeader", () => {
    it("should render the card header", () => {
      const cardHeader = screen.getByTestId("template-card-header");
      expect(cardHeader).toBeInTheDocument();
    });

    it("should have the correct number of children", () => {
      const cardHeader = screen.getByTestId("template-card-header");
      expect(cardHeader.children.length).toBe(2);
    });

    it("should render the card title", () => {
      const cardTitle = screen.getByText("title");
      expect(cardTitle).toBeInTheDocument();
    });

    it("should render the card description", () => {
      const cardDescription = screen.getByText("description");
      expect(cardDescription).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("should render the card footer", () => {
      const cardFooter = screen.getByTestId("template-card-footer");
      expect(cardFooter).toBeInTheDocument();
    });

    it("should have the correct number of children", () => {
      const cardFooter = screen.getByTestId("template-card-footer");
      expect(cardFooter.children.length).toBe(1);
    });

    describe("CardFooter - Button", () => {
      it("should render the card footer Link", () => {
        const cardFooter = screen.getByTestId("template-card-footer");
        expect(cardFooter.children[0].tagName).toBe("A");
      });

      it("should the link have the correct attributes", () => {
        const link = screen.getByTestId("template-card-footer").children[0];
        expect(link.tagName).toBe("A");
        expect(link).toHaveAttribute("href", "/es/templates");
      });

      it("should render the card footer button text", () => {
        const cardFooter = screen.getByText("View Template");
        expect(cardFooter).toBeInTheDocument();
        expect(cardFooter.tagName).toBe("BUTTON");
      });
    });
  });
});
