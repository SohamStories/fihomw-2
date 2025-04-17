"use client";

import { z } from "zod";
import { FileDiff, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AccountTypeSchema, TransactionSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmount } from "@/lib/utils";


const formSchema = TransactionSchema;
  
type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  categoryOptions,
  accountOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    console.log("✅ handleSubmit triggered");
    console.log("📝 Raw form values before conversion:", values);
  
    // Parse amount directly without comma replacement
    const amountAsNumber = parseFloat(values.amount);
  
    if (isNaN(amountAsNumber)) {
      console.error("❌ Invalid amount format:", values.amount);
      // Optionally show a toast or form error here
      return;
    }
  
    const converted = convertAmount(amountAsNumber); // e.g., 2.00 → 2000
    console.log("💰 Converted amount to milli:", converted);
  
    onSubmit({
      ...values,
      amount: String(converted), // assuming backend expects a string
      description: values.description ?? "", // default if undefined
    });
  };
  

  const handleDelete = () => {
    console.log("🗑️ Delete button clicked");
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-1 pt-1"
      >
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative z-50">
                  <DatePicker
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      // Convert Date to ISO string right at the source
                      field.onChange(date instanceof Date ? date.toISOString() : date);
                    }}
                    disabled={disabled}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="accountypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an Account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a Category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a Payee"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Optional Notes"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={disabled}
        >
          {id ? "Save changes" : "Create Transactions"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="" />
            Delete Transaction
          </Button>
        )}
      </form>
    </Form>
  );
};