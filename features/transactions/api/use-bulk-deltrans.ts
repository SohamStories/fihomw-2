import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const usebulkdeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (userData) => {
      try {
        const response = await fetch("http://localhost:3000/api/transactions/bulk-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

      

        // Read response body safely
        const responseBody = await response.text();
       

        if (!response.ok) {
          throw new Error(`Failed to delete Transactions: ${responseBody}`);
        }

        return JSON.parse(responseBody); // ✅ Parse the response manually
      } catch (error) {
        console.error("Error in mutationFn:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Transaction Deleted");

      // ✅ Refetch updated data after deletion
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      console.error("Failed to delete transaction:", error);
      toast.error(error.message || "Failed to delete transaction");
    },
  });

  return mutation;
};
