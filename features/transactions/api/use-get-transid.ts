import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: ["transactions", id],
        queryFn: async () => {
         

            const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const json = await response.json();
       

            return json.data || json || null;
        },
    });
};
