"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategory } from "../hooks/use-new-categories";
import { CategoryForm } from "./category-form";
import { Categoriesschema } from "@/schemas";
import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = Categoriesschema.pick({
    name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

const mutation = useCreateCategory();

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
                    <SheetTitle className="font-semibold text-2xl">New Category</SheetTitle>
                    <SheetDescription className="font-semibold text-slate-500">
                        Make an category to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} 
                defaultValues={{
                    name:"",
                }}/>
            </SheetContent>
        </Sheet>
    );
};
