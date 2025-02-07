"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-get-account";
import { AccountForm } from "./account-form";
import { AccountTypeSchema } from "@/schemas";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";

const formSchema = AccountTypeSchema.pick({
    name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

const mutation = useCreateAccount();

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
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Make an account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} 
                defaultValues={{
                    name:"",
                }}/>
            </SheetContent>
        </Sheet>
    );
};
