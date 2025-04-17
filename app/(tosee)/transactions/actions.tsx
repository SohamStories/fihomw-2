"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;

};


export const Actions = ({ id}: Props ) => {

const [Confirmdialog , confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Transaction"
)
   

    const deleteMutation = useDeleteTransactions();
    const {onOpen} = useOpenTransaction();
    const handleDelete = async () => {
        const ok = await confirm();
    
        if (ok) { // ✅ Delete only if the user confirms
            deleteMutation.mutate({ id });
        }
    };
    


    return (
        <>
        <Confirmdialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
<Button variant="ghost" className="size-8 p-0 ">
    <MoreHorizontal/>
</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                    className="hover:bg-slate-200"
                    disabled={deleteMutation.isPending}
                    onClick={() =>onOpen(id)}
                    >
                        <Edit className="size-4 mr-2"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    className="hover:bg-slate-200"
                    disabled={deleteMutation.isPending}
                    onClick={handleDelete}
                    >
                        <Trash className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};