import userEvent from "@testing-library/user-event";
import Button, { button } from "./Button";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
   test("renders with default style", () => {
      render(<Button>Click me</Button>);
      expect(
         screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Click me" })).toHaveClass(
         button({ size: "sm", color: "outline" }),
      );
   });

   test.each([
      { size: "sm", color: "primary" },
      { size: "md", color: "outline" },
   ] as const)("renders with variants", (variants) => {
      render(<Button {...variants}>Variant Button</Button>);
      expect(
         screen.getByRole("button", { name: "Variant Button" }),
      ).toHaveClass(button(variants));
   });

   test("renders full width", () => {
      render(<Button isFullWidth>Full Width</Button>);
      expect(screen.getByRole("button", { name: "Full Width" })).toHaveClass(
         button({ isFullWidth: true }),
      );
   });

   test("renders disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Disabled" })).toHaveClass(
         "disabled:opacity-60",
      );
   });

   test("clicks triggers onClick function", async () => {
      const user = userEvent.setup();
      const mock = vi.fn();
      render(<Button onClick={mock}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(mock).toHaveBeenCalledOnce();
   });
});
