import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BentoCard } from "./BentoCard";

describe("BentoCard", () => {
  it("renders children correctly", () => {
    render(
      <BentoCard>
        <div>Test Content</div>
      </BentoCard>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders title and description when provided", () => {
    render(
      <BentoCard title="Test Title" description="Test Description">
        <div>Content</div>
      </BentoCard>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <BentoCard icon={<span data-testid="test-icon">Icon</span>}>
        <div>Content</div>
      </BentoCard>,
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <BentoCard className="custom-class">
        <div>Content</div>
      </BentoCard>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
