"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/use-new-transaction";
import {TransactionSchema } from "@/schemas";
import { z } from "zod";
import { useCreateTransactions } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categorie";
import { useGetAccounts } from "@/features/accounts/api/use-get-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

const formSchema = TransactionSchema;

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
    const { isOpen, onClose } = useNewTransaction();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory(); // Fixed typo here
    
    const onCreateCategory = (name: string) => {
      categoryMutation.mutate({
        name, // passing the name to mutate
      });
    };
    
    const categoryOptions = (categoryQuery.data ?? []).map((category: any) => ({
      value: category.id, // Assuming you want the category ID as the value
      label: category.name, // Assuming you want the category name as the label
    }));
    

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount(); // Fixed typo here
    
    const onCreateAccount = (name: string) => {
      accountMutation.mutate({
        name, // passing the name to mutate
      });
    };
    
    const accountOptions = (accountQuery.data ?? []).map((accounts: any) => ({
      value: accounts.id, // Assuming you want the category ID as the value
      label: accounts.name, // Assuming you want the category name as the label
    }));
    
    const mutation = useCreateTransactions();

const isPending = 
mutation.isPending ||
categoryMutation.isPending ||
accountMutation.isPending;

const isLoading = 
categoryQuery.isPending ||
accountQuery.isPending ;

    const onSubmit = (values: FormValues) => {
     mutation.mutate(values, {
        onSuccess: () => {
            onClose();
        }
     });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl">New Transaction</SheetTitle>
                    <SheetDescription className="font-semibold text-slate-500">
                        Make an transaction to track the flow of money.
                    </SheetDescription>
                </SheetHeader>
{isLoading
?(
        <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
        </div>
)
: (

    <TransactionForm onSubmit={onSubmit} disabled={isPending} 
    categoryOptions = {categoryOptions}
    onCreateCategory = {onCreateCategory}
    accountOptions = {accountOptions}
    onCreateAccount = {onCreateAccount}
 />
)
}



            </SheetContent>
        </Sheet>
    );
};
