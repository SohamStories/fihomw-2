"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { InferResponseType } from "hono"
import { client } from "@/lib/hono"
import { Actions } from "./actions"
import { format } from "date-fns"
import { cn, convertmilliunits, formatcurrency } from "@/lib/utils"
import { AccountColumn } from "./account-coloumn"
import { Categorycolumn } from "./category-column"
 
export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
      className=""
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },



  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
        className="text-slate-500"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
    const date = row.getValue("date") as Date;
    return (
      <span>
        {format(date, "dd MMMM, yyyy")}
      </span>
    )
   }
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
        className="text-slate-500"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
   
    return (
      <Categorycolumn
      id={row.original.id}
      category={row.original.categories?.name ?? "Uncategorized"}
      categoryId={row.original.categoryId ?? ""}
    />
    

    )
   }
  },

  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
        className="text-slate-500"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Payee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   },
  
   {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
        className="text-slate-500"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
    const amount = parseFloat(row.getValue("amount"));

   
    const isIncome = amount > 0;
    const isExpense =amount < 0;
    return (
     <Badge
     variant={amount < 0 ? "destructive" : "default"}
     className={cn("text-xs font-semibold px-3.5 py-2.5",isIncome && "bg-blue-500/10 text-blue-400",
      isExpense && "bg-red-600/10 text-red-400"
     )}
     
     >
      
       {formatcurrency(amount)}

     </Badge>
      
    )
   }
  },


  {
    accessorKey: "accounts",
    header: ({ column }) => {
      return (
        <Button
        className="text-slate-500"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
   
    return (
    <AccountColumn

    account={row.original.accountypes.name}
    accountId={row.original.accountypeId}
    />
    )
   }
  },


{ 
  id: "actions",
  cell:({ row }) => <Actions id={row.original.id}/>

},

]
