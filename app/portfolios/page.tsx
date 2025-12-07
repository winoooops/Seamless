import { AssetsTable } from "../components/AssetsTable";
import { RightSidebar } from "../dashboard/components/RightSidebar";

export default function Wallet() {
   return (
      <div className="h-full w-full">
         <div className="w-full h-full flex flex-row space-x-6 lg:col-span-3">
            <AssetsTable />

            <RightSidebar />
         </div>
         {/*<BinanceControl />*/}
      </div>
   );
}
