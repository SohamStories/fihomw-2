"use client";

import { useState } from "react";
import { Star, StarHalf, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Small Business Owner",
    rating: 5,
    comment:
      "This dashboard completely transformed how I manage my business finances. I can see everything at a glance and make better decisions.",
    avatar: null,
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Freelance Designer",
    rating: 4.5,
    comment:
      "As a freelancer, keeping track of income and expenses was always a pain. Now I can see my financial health instantly.",
    avatar: null,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Young Professional",
    rating: 5,
    comment:
      "The budgeting features helped me save for my first home. I've never felt more in control of my finances.",
    avatar: null,
  },
  {
    id: 4,
    name: "Jessica Rodriguez",
    role: "Investor",
    rating: 4.5,
    comment:
      "I can track all my investments in one place. The visualization tools make it easy to see where I need to rebalance.",
    avatar: null,
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Family Financial Planner",
    rating: 5,
    comment:
      "Planning for my family's future is so much easier with this dashboard. The forecasting tools are incredibly accurate.",
    avatar: null,
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <Card   className="hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardContent className="p-6 flex flex-col h-full bg-white rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h4 className="font-semibold">{review.name}</h4>
            <p className="text-sm text-gray-600">{review.role}</p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(Math.floor(review.rating))].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          ))}
          {review.rating % 1 !== 0 && (
            <StarHalf className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          )}
        </div>

        <p className="text-gray-700 flex-grow">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

const ReviewsSection = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleShowMore = () => {
    setVisibleReviews(reviews.length);
  };

  return (
    <section className="py-20 px-4 from-blue-100 bg-gradient-to-b to-slate-200">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who have improved their financial health with our dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.slice(0, visibleReviews).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
            >
              Show More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
