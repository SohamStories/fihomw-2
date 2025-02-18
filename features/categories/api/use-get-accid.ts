import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: ["categories", id],
        queryFn: async () => {
         

            const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const json = await response.json();
       

            return json.data || json || null;
        },
    });
};
