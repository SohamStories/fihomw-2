import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<boolean>] => {
  const [isOpen, setIsOpen] = useState(false);
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve });
      setIsOpen(true);
    });

  const handleClose = () => {
    setIsOpen(false);
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-white ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-slate-500">{message}</DialogDescription>
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} className="font-semibold border-2 bg-slate-200 hover:bg-slate-50 ">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md transition duration-300 hover:bg-red-700 active:scale-95">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
