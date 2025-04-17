import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";


type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const { onClose } = useOpenAccount(); // Get modal close function

  const mutation = useMutation<ResponseType, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete Transaction");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      toast.success("Transaction deleted");

      // Remove the deleted account from cache
      queryClient.setQueryData(["transaction", id], null);

      // Invalidate only the list, not the deleted account
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

      // Close modal if it's open
      onClose();
    },
    onError: (error) => {
      console.error("Failed to delete transaction:", error);
      toast.error(error.message || "Failed to delete transaction");
    },
  });

  return mutation;
};
