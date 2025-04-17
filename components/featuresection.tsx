import {
    PieChart,
    BarChart,
    TrendingUp,
    Coins,
    ShieldCheck,
    Clock,
  } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
  
  const features = [
    {
      icon: <PieChart className="h-8 w-8 text-primary" />,
      title: "Expense Tracking",
      description:
        "Categorize and track all your expenses in one place with visual breakdowns.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Budget Planning",
      description:
        "Create custom budgets and get alerts when you're approaching your limits.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Investment Tracking",
      description:
        "Monitor performance of all your investments with real-time data.",
    },
    {
      icon: <Coins className="h-8 w-8 text-primary" />,
      title: "Savings Goals",
      description:
        "Set savings targets and track your progress with visual milestones.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description:
        "Bank-level encryption ensures your financial data stays private and secure.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Financial Forecasting",
      description:
        "Predict future finances based on your income, spending, and savings rate.",
    },
  ];
  
  const FeaturesSection = () => {
    return (
      <section className="py-20 px-4 from-blue-200 bg-gradient-to-b to-blue-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you track, plan, and grow your wealth with ease.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="bg-primary/10 p-3 border-gray-200 rounded-lg inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  