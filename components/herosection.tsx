"use client";
import { ArrowRight, ChartAreaIcon, PieChart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden text-center from-blue-600  bg-gradient-to-b   to-blue-200">
      {/* Animated Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Take Control of Your
              <span className="text-indigo-800"> Financial Future</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Monitor, analyze, and optimize your finances with our powerful dashboard.
              Make smarter decisions and achieve your financial goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-300 font-semibold hover:bg-blue-500 hover:border-blue-900">
                <Link href="/auth/login">
                  Log In <ArrowRight className="ml-2 h-4 w-4  " />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-blue-300 font-semibold hover:bg-blue-500 hover:border-blue-900">
                <Link href="/auth/register">
                  Create Account
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white animate-pulse"></div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">5,000+</span> users trust our platform
              </p>
            </div>
          </div>

          {/* Animated Dashboard */}
          <div className="relative hidden lg:block animate-float">
            <div className="absolute inset-0 bg-gray-900/5 rounded-2xl rotate-3"></div>
            <div className="relative bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 grid grid-cols-2 gap-4">
                <div className="col-span-2 h-24 bg-blue-100 rounded-lg animate-pulse flex items-center justify-center "><Wallet className="size-10"/></div>
                <div className="h-40 bg-green-100 rounded-lg animate-pulse flex items-center justify-center"> <PieChart className="size-14"/></div>
                <div className="h-40 bg-purple-100 rounded-lg animate-pulse flex items-center justify-center"><ChartAreaIcon className="size-14  
                "/> </div>
                <div className="col-span-2 h-16 bg-gray-100 rounded-lg animate-pulse p-14"> and more...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
