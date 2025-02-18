"use client";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { CategoryForm } from "./category-form";
import { Categoriesschema } from "@/schemas";
import { z } from "zod";
import { useOpenCategory } from "../hooks/use-open-categorie";
import { useGetCategory } from "../api/use-get-accid";
import { Loader2 } from "lucide-react";
import { useEditCategories } from "../api/use-edit-category";
import { useDeleteCategories } from "../api/use-delete-categories";

const formSchema = Categoriesschema.pick({
    name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

const [Confirmdialog , confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Category"
)
    const categoryQuery = useGetCategory(id); // Fetch account details if ID is present
    const editMutation = useEditCategories();
    const deleteMutation = useDeleteCategories();

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = id ? categoryQuery.isLoading : false;
    const categoryData = id ? categoryQuery.data : null;

    const onSubmit = (values: FormValues) => {
        if (!id) {
            console.error("Missing category ID for update");
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
            console.error("Missing category ID for deletion");
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

  


    const defaultValues: FormValues = categoryData
        ? { name: categoryData.name }
        : { name: "" };



    return (

        <>
        <Confirmdialog/>

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 bg-white">
                <SheetHeader>
                    <SheetTitle className="font-semibold text-2xl">Edit Category</SheetTitle>
                    <SheetDescription className="font-semibold text-slate-500">
                        Edit an existing Category.
                    </SheetDescription>
                </SheetHeader>

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <CategoryForm
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
