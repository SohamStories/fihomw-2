import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useOpenAccount } from "../hooks/use-open-account"; // Import modal state

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { onClose } = useOpenAccount(); // Get modal close function

  const mutation = useMutation<ResponseType, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      toast.success("Account deleted");

      // Remove the deleted account from cache
      queryClient.setQueryData(["accounts", id], null);

      // Invalidate only the list, not the deleted account
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    

      // Close modal if it's open
      onClose();
    },
    onError: (error) => {
      console.error("Failed to delete account:", error);
      toast.error(error.message || "Failed to delete account");
    },
  });

  return mutation;
};
