"use client"


import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "../ui/card"

import AuthHeader from "./auth-header"

import { BackButton } from "./back-button"

interface CardWrapperProps {

    children: React.ReactNode;
    headerlabel: string;
    backButtonlabel: string;
    title: string;
    showSocial? : boolean;
    backButtonhref: string;
}


const CardWrapper = ({
    children, headerlabel, backButtonlabel, backButtonhref, title, showSocial
}: CardWrapperProps ) =>{
    return (

        <Card className="w-full  max-w-sm md:w-1/2 shadow-2xl bg-white">


        <CardHeader>
            <AuthHeader label={headerlabel} title={title}/>
        </CardHeader>

        <CardContent>
            {children}
        </CardContent>

        <CardFooter>
            <BackButton label={backButtonlabel} href={backButtonhref}/>

        </CardFooter>


        </Card>

    );
};

export default CardWrapper;