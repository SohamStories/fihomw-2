"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-accountsheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

import { EditCategorySheet } from "@/features/categories/components/editcategorysheet";

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transactionsheet";

import { NewTransactionSheet } from "@/features/transactions/components/new-transactions-sheet";

import { useEffect, useState } from "react";

export const SheetProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
    return (
      <div>
        <NewAccountSheet/>
        <EditAccountSheet/>

<NewCategorySheet/>
        <EditCategorySheet/>
        <NewTransactionSheet/>
        <EditTransactionSheet/>
      </div>
    );
};
