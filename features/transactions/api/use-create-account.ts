import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:3000/api/accounts", {
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
      toast.success("Account Created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.error("Failed to create account:", error);
      toast.error(error.message || "Failed to create account");
    },
  });

  return mutation;
};
