import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Dropdown from "../../Dropdown";
import Trigger from "./Trigger";

describe("Trigger", () => {
   test("renders with children", () => {
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>
               <span>Trigger Me</span>
            </Trigger>
         </Dropdown>,
      );

      expect(
         screen.getByRole("button", { name: "Trigger Me" }),
      ).toBeInTheDocument();
   });

   test("has correct accessibility attributes", () => {
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>
               <span>Trigger</span>
            </Trigger>
         </Dropdown>,
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
   });

   test("toggles aria-expanded on click", async () => {
      const user = userEvent.setup();
      render(
         <Dropdown value="val" onSelect={() => {}}>
            <Trigger>
               <span>Trigger</span>
            </Trigger>
         </Dropdown>,
      );

      const trigger = screen.getByRole("button", { name: "Trigger" });

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
   });
});
