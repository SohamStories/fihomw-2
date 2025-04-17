import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useOpenCategory
 } from "../hooks/use-open-categorie"; // Import modal state

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  const { onClose } = useOpenCategory(); // Get modal close function

  const mutation = useMutation<ResponseType, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      toast.success("Category deleted");

      // Remove the deleted category from cache
      queryClient.setQueryData(["categories", id], null);

      // Invalidate only the list, not the deleted category
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
 

      // Close modal if it's open
      onClose();
    },
    onError: (error) => {
      console.error("Failed to delete category:", error);
      toast.error(error.message || "Failed to delete category");
    },
  });

  return mutation;
};
