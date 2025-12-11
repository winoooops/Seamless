import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BentoGrid } from "./BentoGrid";

describe("BentoGrid", () => {
  it("renders children correctly", () => {
    render(
      <BentoGrid>
        <div>Test Child 1</div>
        <div>Test Child 2</div>
      </BentoGrid>,
    );
    expect(screen.getByText("Test Child 1")).toBeInTheDocument();
    expect(screen.getByText("Test Child 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BentoGrid className="custom-grid-class">
        <div>Content</div>
      </BentoGrid>,
    );
    expect(container.firstChild).toHaveClass("custom-grid-class");
  });

  it("has correct default grid classes", () => {
    const { container } = render(
      <BentoGrid>
        <div>Content</div>
      </BentoGrid>,
    );
    expect(container.firstChild).toHaveClass("grid");
    expect(container.firstChild).toHaveClass("grid-cols-1");
  });
});
