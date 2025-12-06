import { useEffect } from "react";

export function useKeyMap(
   action: () => void,
   binding: string,
   isCombo?: boolean,
) {
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (isCombo && (e.metaKey || e.ctrlKey) && e.key === binding) {
            e.preventDefault();
            action();
         } else if (!isCombo && e.key === binding) {
            e.preventDefault();
            action();
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [isCombo, action, binding]);
}
