import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"] & {id: string};

export const useEditCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({id, ...userData}) => {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
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
      toast.success("Categories Updated", {
        style: {backgroundColor: "green", color:"white"}
      });
      queryClient.invalidateQueries({ queryKey: ["categories" , id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
     
    },
    onError: (error) => {
      console.error("Failed to edit categories:", error);
      toast.error(error.message || "Failed to create categories", {
        style: {backgroundColor: "red" , color: "white"}
      });
    },
  });

  return mutation;
};
