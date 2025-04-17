import { convertmilliunits } from "@/lib/utils";
import {useQuery} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";




export const useGetSummary = () => {

const params = useSearchParams();
const from = params.get("from") || "";
const to = params.get("to") || "";
const accountypeId = params.get("accountypeId") || "";

    const query = useQuery({
        queryKey: ["summary", {from, to ,accountypeId}],
        queryFn:async () => {
            const response = await fetch("http://localhost:3000/api/summary", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(!response.ok) {
                throw new Error ("Failed to fetch summary")
            }

            const {data} = await response.json();
            return {
                ...data,
                incomeAmount: data.incomeAmount,
                expensesAmount: data.expensesAmount,
                remainingAmount: data.remainingAmount,
                categories: data.categories.map((category: { value: number; }) => ({
                    ...category,
                    value: (category.value),
                })),
                days: data.days.map((day: { income: number; expenses: number; }) => ({
                    ...day,
                    income: (day.income),
                    expenses: (day.expenses),
                }))
            };
        },
    });

    return query;
}