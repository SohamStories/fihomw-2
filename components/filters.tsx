import AccountFilter from "@/components/account-filter";
import DateFilter from "@/components/date-filter";
import { Suspense } from "react";

const Filters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">

<Suspense fallback={<div>Loading...</div>}>
      
      <AccountFilter />
      <DateFilter />
    </Suspense>
    </div>
  );
};

export default Filters;