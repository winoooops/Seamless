import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BentoGrid } from "./BentoGrid";

describe("BentoGrid", () => {
   it("renders children correctly", () => {
      render(
         <BentoGrid>
            <div data-testid="child-1">Item 1</div>
            <div data-testid="child-2">Item 2</div>
         </BentoGrid>
      );
      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
   });

   it("applies default grid classes", () => {
      const { container } = render(
         <BentoGrid>
            <div>Item</div>
         </BentoGrid>
      );
      expect(container.firstChild).toHaveClass("grid");
      expect(container.firstChild).toHaveClass("grid-cols-1");
      expect(container.firstChild).toHaveClass("md:grid-cols-3");
      expect(container.firstChild).toHaveClass("lg:grid-cols-4");
      expect(container.firstChild).toHaveClass("gap-4");
   });

   it("merges custom className correctly", () => {
      const { container } = render(
         <BentoGrid className="gap-8 custom-class">
            <div>Item</div>
         </BentoGrid>
      );
      expect(container.firstChild).toHaveClass("custom-class");
      // Tailwind-merge should handle class conflicts if configured,
      // but simple checks verify the class is appended.
      expect(container.firstChild).toHaveClass("gap-8");
   });
});
