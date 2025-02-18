import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"] & {id: string};

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({id, ...userData}) => {
      const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
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
      toast.success("Account Updated");
      queryClient.invalidateQueries({ queryKey: ["accounts" , id] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.error("Failed to edit account:", error);
      toast.error(error.message || "Failed to create account");
    },
  });

  return mutation;
};
