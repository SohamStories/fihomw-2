import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:3000/api/categories", {
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
      toast.success("Category Created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Failed to create category:", error);
      toast.error(error.message || "Failed to create category");
    },
  });

  return mutation;
};
