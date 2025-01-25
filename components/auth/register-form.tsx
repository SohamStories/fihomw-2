"use client"

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

import CardWrapper from "./card-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Input } from "../ui/input";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { Button } from "../ui/button";
import GoogleLogin from "./google-login";

const RegisterForm = () => {

    const [loading, setloading] = useState(false);
    const [error , seterror ] = useState("");
    const [success , setsuccess] = useState("");


    const form  = useForm<z.infer<typeof RegisterSchema>>({
      mode: "onSubmit",
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordconfirmation: "",
        },
    });


    const onSubmit = async ( data: z.infer<typeof RegisterSchema>) => {
        setloading(true);
        register(data).then((res) => {
            if(res.error) {
                seterror(res.error);
                setloading(false);
            }

            if(res.success) {
                seterror("");
                setsuccess(res.success);
                setloading(false);
            
            }
        });
    };

    return ( 

        <CardWrapper
        headerlabel="Create an account "
        title="Register"
        backButtonhref="/auth/login"
        backButtonlabel="Already have an account"
        showSocial
        >

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div className="space-y-1">

                    <FormField 
                    control={form.control}
                    name = "email"
                  render={({ field }) =>(
                <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>

                    <Input className="text-slate-500 font-normal"
                    {...field}
                    placeholder="johndoe@gmail.com"
                    type="email"
                    />

                    </FormControl>
                    <FormMessage />
                </FormItem>
    )}
    />

<FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input className="text-slate-500 font-normal"{...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input className="text-slate-500 font-normal" {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordconfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel  className="font-semibold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input  className="text-slate-500 font-normal"{...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

</div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full bg-black text-white font-semibold" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
      <GoogleLogin />
    </CardWrapper>
  );
};

export default RegisterForm;