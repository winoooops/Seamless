import Button from "@/app/_components/Button";
import { Circle } from "lucide-react";
import { ReactNode } from "react";

export function CommandItem({
   icon,
   label,
   shortcut,
}: {
   icon?: ReactNode;
   label: string;
   shortcut?: string;
}) {
   return (
      <Button size="md" color="outline" isFullWidth={true} hasIcon={true}>
         <div className="flex items-center gap-3">
            {icon ?? <Circle />}
            <span className="text-sm">{label}</span>
         </div>
         {shortcut && (
            <span className="text-xs text-gray-500 font-mono">{shortcut}</span>
         )}
      </Button>
   );
}
