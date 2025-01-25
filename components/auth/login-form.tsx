"use client";

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
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";

import { FormError } from "./form-error";
import { Button } from "../ui/button";
import GoogleLogin from "./google-login";
import { login } from "@/actions/login";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const form = useForm<z.infer<typeof LoginSchema>>({
        mode: "onSubmit",
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

  const onSubmit = async (data: z.infer<typeof LoginSchema>)  => {
    setLoading(true);
    login(data).then((res) => {
        if(res?.error) {
            setError(res?.error);
            setLoading(false);
        } else {
            setError("");
                setLoading(false);
            
        }
    });
  };

    return (
        <CardWrapper
            headerlabel="Login"
            title="Login to your account"
            backButtonhref="/auth/register"
            backButtonlabel="Don't have an account?"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div className="space-y-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-slate-500 font-normal"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="text-slate-500 font-normal"
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />

                    <Button
                        type="submit"
                        className="w-full bg-black text-white font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>
            </Form>
            <GoogleLogin />
        </CardWrapper>
    );
};

export default LoginForm;
