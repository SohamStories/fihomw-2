"use client";

import { JSX, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useGetAccounts } from "../api/use-get-account";
import { Select } from "@/components/select";
import { useCreateAccount } from "../api/use-create-account";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<string | undefined>
] => {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) => {
    console.log("➕ Creating new account with name:", name);
    accountMutation.mutate({ name });
  };

  const accountOptions = (accountQuery.data ?? []).map((account: { id: string; name: string }) => ({
    value: account.id,
    label: account.name,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string | undefined>(undefined);

  const confirm = () =>
    new Promise<string | undefined>((resolve) => {
      console.log("📥 Account dialog opened (confirm called)");
      setPromise({ resolve });
    });

  const handleClose = () => {
    console.log("🧹 Dialog closed");
    setPromise(null);
  };

  const handleConfirm = () => {
    console.log("✅ Confirm button clicked");
    console.log("📤 Selected account ID:", selectValue.current);
    if (promise) {
      promise.resolve(selectValue.current);
      handleClose();
    }
  };

  const handleCancel = () => {
    console.log("❌ Cancel button clicked");
    if (promise) {
      promise.resolve(undefined);
      handleClose();
    }
  };

  const ConfirmationDialog = (): JSX.Element => (
    <Dialog open={!!promise} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-100">
        <DialogHeader>
          <DialogTitle>Select an account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onChange={(value) => {
            console.log("🔄 Account selection changed:", value);
            selectValue.current = value;
          }}
          onCreate={onCreateAccount}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
