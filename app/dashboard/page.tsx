import { PortfolioAllocation } from "./components/PortfolioAllocation";
import { IDEWindow } from "../components/IDEWindow";
import { CareerChart } from "./components/CareerChart";
import { AssetsTable } from "../components/AssetsTable";

export default function Dashboard() {
   return (
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 h-full flex flex-col space-y-6">
            <IDEWindow title="Assets Table" className="flex-1">
               <AssetsTable />
            </IDEWindow>

            <IDEWindow title="Portfolio Allocation" className="h-1/3">
               <PortfolioAllocation />
            </IDEWindow>
         </div>

         <div className="lg:col-span-1 h-full flex flex-col gap-6">
            <IDEWindow title="Career" className="h-full">
               <CareerChart />
            </IDEWindow>
         </div>
      </div>
   );
}
