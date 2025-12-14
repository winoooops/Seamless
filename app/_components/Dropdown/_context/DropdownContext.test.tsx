import { renderHook } from "@testing-library/react";
import { DropdownContext, useDropdown } from "./DropdownContext";
import { ReactNode } from "react";

describe("DropdownContext", () => {
   test("throw error if used outside provider", () => {
      expect(() => renderHook(() => useDropdown())).toThrow(
         "useDropdown must be used within a DropdownProvider",
      );
   });

   test("consumes context values", () => {
      const value: ReturnType<typeof useDropdown> = {
         id: "",
         open: false,
         toggle: () => {},
         close: () => {},
         selectedValue: "",
         onSelect: () => {},
      };

      const wrapper = ({ children }: { children: ReactNode }) => (
         <DropdownContext.Provider value={value}>
            {children}
         </DropdownContext.Provider>
      );

      const { result } = renderHook(() => useDropdown(), { wrapper });

      expect(result.current).toBe(value);
   });
});
