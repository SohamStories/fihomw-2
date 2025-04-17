"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { AccountTypeSchema, TransactionSchema } from "@/schemas";
import { z } from "zod";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transid";
import { useEditTransactions } from "../api/use-edit-transactions";
import { useDeleteTransactions } from "../api/use-delete-transaction";
import { TransactionForm } from "./transaction-form";
import { useGetAccounts } from "@/features/accounts/api/use-get-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categorie";

const formSchema = TransactionSchema;

type FormValues = z.infer<typeof formSchema>;

// Define proper types for the dropdown options
interface OptionType {
  value: string;
  label: string;
}

export const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();
    // State to track when all data is ready for form rendering
    const [isDataReady, setIsDataReady] = useState(false);

    const [Confirmdialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this Transaction"
    );

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    
    const onCreateCategory = (name: string) => {
      categoryMutation.mutate({
        name,
      });
    };
    
    const categoryOptions: OptionType[] = (categoryQuery.data ?? []).map((category: any) => ({
      value: category.id,
      label: category.name,
    }));
    
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    
    const onCreateAccount = (name: string) => {
      accountMutation.mutate({
        name,
      });
    };
    
    const accountOptions: OptionType[] = (accountQuery.data ?? []).map((accounts: any) => ({
      value: accounts.id,
      label: accounts.name,
    }));

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransactions();
    const deleteMutation = useDeleteTransactions();

    const isPending = editMutation.isPending || 
                     deleteMutation.isPending || 
                     transactionQuery.isLoading ||
                     categoryMutation.isPending || 
                     accountMutation.isPending;
                     
    const isLoading = transactionQuery.isLoading ||
                     categoryQuery.isLoading ||
                     accountQuery.isLoading;
                     
    const transactionData = id ? transactionQuery.data : null;

    // Use effect to ensure all data is loaded before rendering the form
    useEffect(() => {
        if (!isLoading && transactionData && accountOptions.length > 0 && categoryOptions.length > 0) {
            setIsDataReady(true);
        }
    }, [isLoading, transactionData, accountOptions, categoryOptions]);

    // Debug the full structure of transaction data
    useEffect(() => {
        if (transactionData) {
            console.log("Full transaction data:", JSON.stringify(transactionData));
            // Log the exact structure of accountypes and categories objects
            console.log("Account type structure:", JSON.stringify(transactionData.accountypes));
            console.log("Category structure:", JSON.stringify(transactionData.categories));
        }
    }, [transactionData]);

    const onSubmit = (values: FormValues) => {
        if (!id) {
            console.error("Missing transaction ID for update");
            return;
        }

        // Extract just the IDs from the selected options before submitting
        const processedValues = {
            ...values,
            categoryId: typeof values.categoryId === 'object' && values.categoryId !== null 
                ? (values.categoryId as OptionType).value 
                : values.categoryId,
            accountypeId: typeof values.accountypeId === 'object' && values.accountypeId !== null
                ? (values.accountypeId as unknown as OptionType).value
                : values.accountypeId
        };

        console.log("Submitting values:", processedValues);

        editMutation.mutate({ id, ...processedValues }, {  
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onDelete = async() => {
        if (!id) {
            console.error("Missing transaction ID for deletion");
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
  
    const getDefaultValues = () => {
        if (!transactionData || !isDataReady) {
            return {
                date: "",
                accountypeId: undefined,
                amount: "",
                payee: "",
                categoryId: undefined,
                description: "",
            };
        }
        
        // Account and category might have different field names than expected
        // Log all available options to compare
        console.log("Available account options:", accountOptions);
        console.log("Available category options:", categoryOptions);
        
        // Try to find account by id directly from the transaction data
        const accountId = transactionData.accountypes?.id;
        const categoryId = transactionData.categories?.id;
        
        console.log("Looking for account with ID:", accountId);
        console.log("Looking for category with ID:", categoryId);
        
        // Find matching options in the dropdown lists
        const selectedAccount = accountOptions.find(opt => opt.value === accountId);
        const selectedCategory = categoryOptions.find(opt => opt.value === categoryId);
        
        console.log("Selected account option:", selectedAccount);
        console.log("Selected category option:", selectedCategory);
        
        return {
            date: transactionData.date,
            accountypeId: selectedAccount ?? undefined as any,
            amount: (transactionData.amount / 1000).toString(),
            payee: transactionData.payee,
            categoryId: selectedCategory ?? undefined as any,
            description: transactionData.description ?? "",
        };
    };

    const defaultValues = getDefaultValues();

    return (
        <>
        <Confirmdialog/>

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl">Edit Transactions</SheetTitle>
                    <SheetDescription className="font-semibold text-slate-500">
                        Edit an existing Transaction.
                    </SheetDescription>
                </SheetHeader>

                {!isDataReady ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <TransactionForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                        onDelete={onDelete}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                    />
                )}
            </SheetContent>
        </Sheet>
        </>
    );
};