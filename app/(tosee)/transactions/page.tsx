"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./column";
import { DataTable } from "@/components/auth/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/features/transactions/api/use-get-transaction";
import { usebulkdeleteTransactions } from "@/features/transactions/api/use-bulk-deltrans";
import { Suspense, useEffect, useState } from "react";

// Client-side render only when mounted
const TransactionPage = () => {
  const NewTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = usebulkdeleteTransactions();

  const [isClient, setIsClient] = useState(false); // Check if on client-side

  useEffect(() => {
    setIsClient(true); // Set to true once mounted on client-side
  }, []);

  const transactions = transactionsQuery.data || [];
  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  if (!isClient) {
    // Render nothing or a loading state during SSR or static rendering
    return null;
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full -mt-24 px-12">
        <Card className="border-none drop-shadow-sm bg-white">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-48 bg-slate-200 rounded-xl" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center pb-10">
              <Loader2 className="size-8 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full -mt-24 px-12">
      {/* Suspense wrapper around async operation */}
      <Suspense fallback={<div>Loading...</div>}>
        <Card className="border-none drop-shadow-sm bg-white">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>Transactions History</CardTitle>
            <div className="flex items-center gap-x-2">
              <Button
                className="px-6 py-3 rounded-xl bg-blue-950 text-white font-semibold shadow-md transition duration-300 hover:bg-blue-700 active:scale-95"
                onClick={NewTransaction.onOpen}
              >
                <Plus className="size-4 mr-1" />
                Add new
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="date"
              columns={columns}
              data={transactions}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteTransactions.mutate({ ids });
              }}
              disabled={isDisabled}
            />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
};

export default TransactionPage;
