import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BentoCard } from "./BentoCard";

describe("BentoCard", () => {
   it("renders children correctly", () => {
      render(
         <BentoCard>
            <div data-testid="child-content">Child Content</div>
         </BentoCard>
      );
      expect(screen.getByTestId("child-content")).toBeInTheDocument();
      expect(screen.getByText("Child Content")).toBeInTheDocument();
   });

   it("renders title and description correctly", () => {
      render(
         <BentoCard title="Test Title" description="Test Description">
            Content
         </BentoCard>
      );
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
   });

   it("renders icon correctly", () => {
      render(
         <BentoCard icon={<span data-testid="test-icon">Icon</span>}>
            Content
         </BentoCard>
      );
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
   });

   it("renders headerAction correctly", () => {
      render(
         <BentoCard headerAction={<button>Action</button>}>Content</BentoCard>
      );
      expect(
         screen.getByRole("button", { name: "Action" })
      ).toBeInTheDocument();
   });

   it("applies custom className", () => {
      const { container } = render(
         <BentoCard className="custom-class">Content</BentoCard>
      );
      // The outer div should have the custom class
      expect(container.firstChild).toHaveClass("custom-class");
   });

   it("does not render header section if no header props are provided", () => {
      const { container } = render(<BentoCard>Content</BentoCard>);
      // The header section contains "flex items-center justify-between p-6 pb-2"
      // We can check if the title/description elements are absent
      const headerTitle = screen.queryByRole("heading");
      expect(headerTitle).not.toBeInTheDocument();
   });
});
