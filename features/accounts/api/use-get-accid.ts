import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: ["accounts", id],
        queryFn: async () => {
         

            const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch account");
            }

            const json = await response.json();
       

            return json.data || json || null;
        },
    });
};
