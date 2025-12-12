import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
   test("renders with initial value", () => {
      render(
         <Dropdown
            options={[
               { label: "Option 1", value: "opt1" },
               { label: "Option 2", value: "opt2" },
               { label: "Option 3", value: "opt3" },
            ]}
            value="opt1"
            onChange={() => {}}
         />,
      );
      expect(screen.getByText("Option 1")).toBeInTheDocument();
   });

   test("toggles options list on click", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown
            options={[
               { label: "Option 1", value: "opt1" },
               { label: "Option 2", value: "opt2" },
               { label: "Option 3", value: "opt3" },
            ]}
            value="opt1"
            onChange={() => {}}
         />,
      );

      expect(screen.queryByRole("option")).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Option 1" }));
      expect(screen.getAllByRole("option")).toHaveLength(3);

      await user.click(screen.getByRole("button", { name: "Option 1" }));
      expect(screen.queryByRole("option")).not.toBeInTheDocument();
   });

   test("calls onChange when option is selected", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
         <Dropdown
            options={[
               { label: "Option 1", value: "opt1" },
               { label: "Option 2", value: "opt2" },
               { label: "Option 3", value: "opt3" },
            ]}
            value="opt1"
            onChange={handleChange}
         />,
      );

      await user.click(screen.getByRole("button", { name: "Option 1" }));

      await user.click(screen.getByRole("option", { name: "Option 2" }));

      expect(handleChange).toHaveBeenCalledWith("opt2");
      expect(handleChange).toHaveBeenCalledTimes(1);
   });

   test("closes dropdown after selection", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown
            options={[
               { label: "Option 1", value: "opt1" },
               { label: "Option 2", value: "opt2" },
               { label: "Option 3", value: "opt3" },
            ]}
            value="opt1"
            onChange={() => {}}
         />,
      );

      await user.click(screen.getByRole("button", { name: "Option 1" }));
      expect(
         screen.getByRole("option", { name: "Option 2" }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole("option", { name: "Option 2" }));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
   });

   test("highlights selected option", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown
            options={[
               { label: "Option 1", value: "opt1" },
               { label: "Option 2", value: "opt2" },
               { label: "Option 3", value: "opt3" },
            ]}
            value="opt2"
            onChange={() => {}}
         />,
      );

      await user.click(screen.getByRole("button", { name: "Option 2" }));

      const selectedOption = screen.getByRole("option", { name: "Option 2" });
      expect(selectedOption).toHaveClass("text-emerald-500");
      expect(selectedOption).toHaveClass("bg-emerald-500/5");

      const unselectedOption = screen.getByRole("option", { name: "Option 1" });
      expect(unselectedOption).toHaveClass("text-neutral-300");
   });
});
