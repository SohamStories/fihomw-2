"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewCategory } from "@/features/categories/hooks/use-new-categories";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./column";
import { DataTable } from "@/components/auth/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categorie";
import { Skeleton } from "@/components/ui/skeleton";
import { usebulkdeleteCategories } from "@/features/categories/api/use-bulk-delete-cat";
const CategoriesPage = () => {
    const NewCategory = useNewCategory();
    const categoryQuery = useGetCategories();
    const deletecategory = usebulkdeleteCategories();
    const isdisabled = 
    categoryQuery.isLoading ||
    deletecategory.isPending
    // Debugging: Check if data is loading or there's an error
   if(categoryQuery.isLoading) {

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

   const category = categoryQuery.data || [];

    return (
        <div className="max-w-screen-2xl mx-auto w-full -mt-24 px-12"> 
            <Card className="border-none drop-shadow-sm bg-white">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories Page
                    </CardTitle>
                    <Button 
                        className="px-6 py-3 rounded-xl bg-blue-950 text-white font-semibold shadow-md transition duration-300 hover:bg-blue-700 active:scale-95"
                        onClick={NewCategory.onOpen}
                    >
                        <Plus className="size-4 mr-1"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        filterKey={"name"}
                        columns={columns} 
                        data={category} 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id);
                            deletecategory.mutate({ids});
                        }}
                        disabled={isdisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriesPage;
