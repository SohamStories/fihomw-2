import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const usebulkdeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (userData) => {
      try {
        const response = await fetch("http://localhost:3000/api/categories/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

      

        // Read response body safely
        const responseBody = await response.text();
       

        if (!response.ok) {
          throw new Error(`Failed to delete category: ${responseBody}`);
        }

        return JSON.parse(responseBody); // ✅ Parse the response manually
      } catch (error) {
        console.error("Error in mutationFn:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Category Deleted");

      // ✅ Refetch updated data after deletion
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to delete category:", error);
      toast.error(error.message || "Failed to delete category");
    },
  });

  return mutation;
};
