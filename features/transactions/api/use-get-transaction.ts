import {useQuery} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";




export const useGetTransactions = () => {

const params = useSearchParams();
const from = params.get("from") || "";
const to = params.get("to") || "";
const accountypeId = params.get("accountypeId") || "";

    const query = useQuery({
        queryKey: ["transactions", {from, to ,accountypeId}],
        queryFn:async () => {
            const response = await fetch("http://localhost:3000/api/transactions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(!response.ok) {
                throw new Error ("Failed to fetch transactions")
            }

            const {data} = await response.json();
            return data;
        },
    });

    return query;
}