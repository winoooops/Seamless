import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Menu from "./Menu";
import Dropdown from "../../Dropdown";
import Trigger from "../Trigger";

describe("DropdownMenu", () => {
   test("is not visible by default", () => {
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Menu>
               <li role="option">Item</li>
            </Menu>
         </Dropdown>,
      );

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
   });

   test("becomes visible when open", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>Toggle</Trigger>
            <Menu>
               <li role="option">Item 1</li>
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
   });

   test("has correct accessibility attributes", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>Toggle</Trigger>
            <Menu>
               <li role="option" aria-selected={false}>
                  Item
               </li>
            </Menu>
         </Dropdown>,
      );

      await user.click(screen.getByRole("button", { name: "Toggle" }));

      const menu = screen.getByRole("listbox");
      expect(menu).toHaveAttribute("id");
      expect(menu.id).toMatch(/^listbox-/);
   });
});
