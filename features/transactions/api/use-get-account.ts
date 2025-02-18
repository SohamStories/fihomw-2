import {useQuery} from "@tanstack/react-query";



export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn:async () => {
            const response = await fetch("http://localhost:3000/api/accounts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(!response.ok) {
                throw new Error ("Failed to fetch accounts")
            }

            const {data} = await response.json();
            return data;
        },
    });

    return query;
}