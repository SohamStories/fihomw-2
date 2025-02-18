"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { AccountForm } from "./account-form";
import { AccountTypeSchema } from "@/schemas";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-accid";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";

const formSchema = AccountTypeSchema.pick({
    name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

const [Confirmdialog , confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Transaction"
)
    const accountQuery = useGetAccount(id); // Fetch account details if ID is present
    const editMutation = useEditAccount();
    const deleteMutation = useDeleteAccount();

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = id ? accountQuery.isLoading : false;
    const accountData = id ? accountQuery.data : null;

    const onSubmit = (values: FormValues) => {
        if (!id) {
            console.error("Missing account ID for update");
            return;
        }

        editMutation.mutate({ id, ...values }, {  
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onDelete = async() => {
        if (!id) {
            console.error("Missing account ID for deletion");
            return;
        }
const ok = await confirm();

if(!ok) {
    return null;
}
        deleteMutation.mutate({ id }, {  
            onSuccess: () => {
                onClose();
            },
        });
    };

  


    const defaultValues: FormValues = accountData
        ? { name: accountData.name }
        : { name: "" };



    return (

        <>
        <Confirmdialog/>

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl">Edit Account</SheetTitle>
                    <SheetDescription className="font-semibold text-slate-500">
                        Edit an existing Account.
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <AccountForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                        onDelete={onDelete} // Properly pass the delete function
                    />
                )}
            </SheetContent>
        </Sheet>
        </>
    );
};
