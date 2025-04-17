import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useOpenCategory } from "@/features/categories/hooks/use-open-categorie";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
    id:string;
    category: string | "";
    categoryId: string | "" ;

};

export const Categorycolumn = ({
    id,
    category,
    categoryId
}: Props ) => {

    const {onOpen: onOpencategory } =useOpenCategory();

    const onClick = () => {
        onOpencategory(categoryId);
    };

    return (
        <div 
        onClick={onClick}
        className={cn("flex items-center cursor-pointer hover:underline",
            !category && "text-rose-500"
        )}>
            {!category && <TriangleAlert
            className="mr-2 size-4 shrink-0"
            />}
            {category || "uncategorized"}
        </div>
    )
}