import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import MenuItem from "./MenuItem";
import Dropdown from "../../Dropdown";
import Menu from "../Menu";
import Trigger from "../Trigger";

describe("MenuItem", () => {
   test("renders label correctly", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>Open</Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      expect(
         screen.getByRole("option", { name: "Option 1" }),
      ).toBeInTheDocument();
   });

   test("indicates selection state via aria-selected", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="opt1" onSelect={() => {}}>
            <Trigger>Open</Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
               <MenuItem value="opt2" label="Option 2" />
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));

      const opt1 = screen.getByRole("option", { name: "Option 1" });
      const opt2 = screen.getByRole("option", { name: "Option 2" });

      expect(opt1).toHaveAttribute("aria-selected", "true");
      expect(opt2).toHaveAttribute("aria-selected", "false");
   });

   test("calls onSelect when clicked", async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
         <Dropdown value="" onSelect={handleSelect}>
            <Trigger>Open</Trigger>
            <Menu>
               <MenuItem value="opt1" label="Option 1" />
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("option", { name: "Option 1" }));

      expect(handleSelect).toHaveBeenCalledWith("opt1");
   });
});
