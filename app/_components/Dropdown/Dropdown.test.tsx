import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Dropdown, { Menu, MenuItem, Trigger } from "./index";

describe("Dropdown", () => {
   test("renders with initial value", () => {
      render(
         <Dropdown value="opt1" onSelect={() => {}}>
            <Trigger>
               <span>opt1</span>
            </Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
            </Menu>
         </Dropdown>,
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
      expect(
         within(screen.getByRole("group")).getByRole("button", {
            name: "opt1",
         }),
      ).toBeInTheDocument();
   });

   test("calls onSelect when item is clicked", async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
         <Dropdown value="opt1" onSelect={handleSelect}>
            <Trigger>
               <span>Select</span>
            </Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
               <MenuItem value="opt2" label="Option 2" />
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Select" }));

      await user.click(screen.getByRole("option", { name: "Option 2" }));

      expect(handleSelect).toHaveBeenCalledWith("opt2");
      expect(handleSelect).toHaveBeenCalledTimes(1);
   });

   test("toggles menu visibility on trigger click", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="opt1" onSelect={() => {}}>
            <Trigger>
               <span>Select</span>
            </Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
            </Menu>
         </Dropdown>,
      );

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Select" }));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(
         screen.getByRole("option", { name: "Option 1" }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Select" }));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
   });

   test("aria-controls correctly syncs up between Trigger and Menu", async () => {
      const user = userEvent.setup();

      render(
         <Dropdown value="opt1" onSelect={() => {}}>
            <Trigger>
               <span>Select</span>
            </Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
            </Menu>
         </Dropdown>,
      );

      const trigger = screen.getByRole("button", { name: "Select" });
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      const listbox = screen.getByRole("listbox");
      expect(trigger).toHaveAttribute("aria-controls", listbox.id);
   });
});
