"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./column";
import { DataTable } from "@/components/auth/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-account";
import { Skeleton } from "@/components/ui/skeleton";
import { usebulkdeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

const AccountPage = () => {
    const NewAccount = useNewAccount();
    const accountQuery = useGetAccounts();
    const deleteAccounts = usebulkdeleteAccounts();
    const isdisabled = 
    accountQuery.isLoading ||
    deleteAccounts.isPending
    // Debugging: Check if data is loading or there's an error
   if(accountQuery.isLoading) {

    return (

        <div className="max-w-screen-2xl mx-auto w-full -mt-24 px-12">
        <Card className="border-none drop-shadow-sm bg-white">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">

        <CardTitle className="text-xl ">

            <Skeleton className="h-8 w-48 bg-slate-200 roundend-xl"/>
        </CardTitle>
        <CardTitle className="text-xl line-clamp-1">

<Skeleton className="h-8 w-48 bg-slate-200 roundend-xl"/>
</CardTitle>

        </CardHeader>
<CardContent>
    <div className="h-[500px] w-full flex items-center justify-center pb-10 ">
<Loader2 className="size-8 text-slate-300 animate-spin"/>
    </div>
</CardContent>
            </Card> 
    </div>
)
   } 

   const accounts = accountQuery.data || [];

    return (
        <div className="max-w-screen-2xl mx-auto w-full -mt-24 px-12"> 
            <Card className="border-none drop-shadow-sm bg-white">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts Page
                    </CardTitle>
                    <Button 
                        className="px-6 py-3 rounded-xl bg-blue-950 text-white font-semibold shadow-md transition duration-300 hover:bg-blue-700 active:scale-95"
                        onClick={NewAccount.onOpen}
                    >
                        <Plus className="size-4 mr-1"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        filterKey={"name"}
                        columns={columns} 
                        data={accounts} 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deleteAccounts.mutate({ids});
                        }}
                        disabled={isdisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountPage;
