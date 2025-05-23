import { z } from "zod";
import { Trash } from "lucide-react";
import  {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Categoriesschema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = Categoriesschema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const CategoryForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
       onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (

        <Form  {...form}>

            <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
            >
            <FormField
            name="name"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel className="font-semibold text-lg">
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input
                        autoFocus
                        disabled={disabled}
                        placeholder="e.g Food,Travel etc"
                        {...field}/>
                    </FormControl>
                </FormItem>
            )}
            
            />
<Button      className="w-full bg-black text-white hover:bg-gray-800" disabled={disabled}>
    {id ? "Save changes" : "Create Category"}
</Button>
{!!id && ( <Button
type="button"
disabled={disabled}
onClick={handleDelete}
className="w-full"
variant="outline"
>
    <Trash className=""/>
    Delete category
</Button>)
}
            </form>

        </Form>
    
    )
}