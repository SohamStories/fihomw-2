import { z } from "zod";
import { Trash } from "lucide-react";
import  {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AccountTypeSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = AccountTypeSchema.pick({
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

export const AccountForm = ({
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

    const handlesubmit = (values: FormValues) => {
        onSubmit(values);
    };

    const handledelete = () => {
        onDelete?.();
    };

    return (

        <Form  {...form}>

            <form 
            onSubmit={form.handleSubmit(handlesubmit)}
            className="space-y-4 pt-4"
            >
            <FormField
            name="name"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input
                        disabled={disabled}
                        placeholder="e.g Cash, Bank, Credit Card"
                        {...field}/>
                    </FormControl>
                </FormItem>
            )}
            
            />
<Button      className="w-full bg-black text-white hover:bg-gray-800" disabled={disabled}>
    {id ? "Save changes" : "Create Account"}
</Button>
{!!id && ( <Button
type="button"
disabled={disabled}
onClick={handledelete}
className="w-full"
variant="outline"
>
    <Trash className="size-4 pr-2"/>
    Delete account
</Button>)
}
            </form>

        </Form>
    
    )
}