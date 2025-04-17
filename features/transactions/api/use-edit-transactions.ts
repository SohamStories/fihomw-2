import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"] & {id: string};

export const useEditTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({id, ...userData}) => {
      const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),

      
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
    
      return response.json();
    },
    onSuccess: (_, {id}) => {
      toast.success("Transaction Updated");
      queryClient.invalidateQueries({ queryKey: ["transaction" , id] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      console.error("Failed to edit Transaction:", error);
      toast.error(error.message || "Failed to create Transaction");
    },
  });

  return mutation;
};
