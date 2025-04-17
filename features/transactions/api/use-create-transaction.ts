import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"];

export const useCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (userData) => {

    

      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),

      
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
    
      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction Created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      console.error("Failed to create transactions:", error);
      toast.error(error.message || "Failed to create transactions");
    },
  });

  return mutation;
};
