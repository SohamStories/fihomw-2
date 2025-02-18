import * as z from "zod";


export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Please enter the valid email-Id"
    }),
    name: z.string().min(1,{
        message: "Name is Required"
    }),

    password: z.string().min(6,{
        message:"Password must be at least 6 characters long "
    }),

    passwordconfirmation: z.string().min(6,{

        message: "Password must be at least 6 characters long "
    }),
});


export const LoginSchema = z.object ({

    email: z.string().email({
        message:"Please enter the valid email-Id"
    }),

    password: z.string().min(1,{
        message:"Please enter the valid Password"
    })

})

export const AccountTypeSchema = z.object({
    name: z.string().min(1,{
        message:"Please Enter the Name of an account"
    })
})

export const Categoriesschema = z.object({
    name: z.string().min(1,{
        message:"Please Enter the Name of an Categories"
    })
})



export const TransactionSchema = z.object({
  
  date: z.string().datetime(), // ISO date-time string
  amount: z.number().positive(), // Positive number for transaction amount
  description: z.string().optional(), // Optional description
  accountypeId: z.string(), // Account type ID (assumed to be a string)
  categoryId: z.string(), // Category ID (assumed to be a string)
  payee: z.string(), // Optional payee name
});
