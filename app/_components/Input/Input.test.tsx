import Input, { input } from "./Input";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
   test("renders the input group with base style", () => {
      render(<Input />);
      expect(screen.getByRole("group", { name: "Input" })).toBeInTheDocument();
      expect(screen.getByRole("group", { name: "Input" })).toHaveClass(
         input({
            size: "default",
            variant: "transparent",
         }),
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
   });

   test.each([
      {
         size: "large",
         variant: "outline",
      },
   ] as const)("renders input with ", ({ size, variant }) => {
      render(<Input size={size} variant={variant} />);
      expect(screen.getByRole("group", { name: "Input" })).toHaveClass(
         input({ size, variant }),
      );
   });

   test("accecpts and renders with styles passed in", () => {
      render(<Input className="border-pink-500" />);
      expect(screen.getByRole("group", { name: "Input" })).toHaveClass(
         "border-pink-500",
      );
   });

   test("renders prefix and suffix", () => {
      render(
         <Input
            prefix={<div aria-label="Prefix"></div>}
            suffix={<div aria-label="Suffix"></div>}
         />,
      );

      expect(screen.getByLabelText("Prefix")).toBeInTheDocument();
      expect(screen.getByLabelText("Suffix")).toBeInTheDocument();
   });

   test("synchronizes the text values with user input", async () => {
      const user = userEvent.setup();
      const mock = vi.fn();

      render(<Input onChange={mock} />);

      const value = "Hello";
      await user.type(screen.getByRole("textbox"), value);
      expect(mock).toHaveBeenLastCalledWith(
         expect.objectContaining({
            target: expect.objectContaining({
               value,
            }),
         }),
      );
   });
});
