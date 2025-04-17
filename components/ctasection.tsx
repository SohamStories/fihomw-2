"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-16 px-4 from-slate-200 bg-gradient-to-b to-slate-50 text- ">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Financial Future?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of users who have taken control of their finances.
          Get started today with a free account.
        </p>
        <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 transition-all">
          <Link href="/auth/register">
            Create Free Account <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
