import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../_components/Button";

export function Header() {
   // const pathString = "/dashboard/portfolio/daily";
   const pathString = usePathname();
   const pathParts = pathString?.split("/").slice(1);

   return (
      <header className="h-14 border-b border-white/5 bg-black/20 flex items-center justify-between px-6 backdrop-blur-sm">
         <nav aria-label="breadcrumbs">
            <div className="text-sm text-gray-400 flex items-center justify-around gap-4">
               {pathParts &&
                  pathParts.map((part, idx) => {
                     return (
                        <Link
                           href={"/" + pathParts.slice(0, idx + 1).join("/")}
                           key={part}
                           className="px-.5 py-1 before:content-['/'] before:w-0.5 before:-left-2 before:top-1/2 before:-translate-y-1/2 before:text-white"
                        >
                           <span
                              className={`${idx === pathParts.length - 1 ? "text-white" : ""}`}
                           >
                              {part}
                           </span>
                        </Link>
                     );
                  })}
            </div>
         </nav>

         <div className="flex items-center gap-4">
            <Button color="primary">New Bounty</Button>
            <div className="h-8 w-8 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 ring-2 ring-white/10" />
         </div>
      </header>
   );
}
