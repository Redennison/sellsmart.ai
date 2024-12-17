"use client";

import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect, forwardRef } from "react";
import { LineChart, Clock, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FeaturesProps {
  // Add any props here if needed in the future
}

const Features = forwardRef<HTMLDivElement, FeaturesProps>((props, ref) => {
  const cards = [
    {
      icon: <LineChart className="h-10 w-10 text-purple-500" />,
      title: "Market Analysis",
      description: "Real-time market data analysis to determine the optimal selling price",
    },
    {
      icon: <Clock className="h-10 w-10 text-purple-500" />,
      title: "Perfect Timing",
      description: "AI-powered predictions for the best time to sell your vehicle",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-purple-500" />,
      title: "Value Optimization",
      description: "Personalized recommendations to maximize your car's resale value",
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Run the animation only once
    });
  }, []);

  return (
    <section ref={ref} className="py-24 bg-slate-900 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-slate-800 border-slate-700 transform transition-opacity"
            >
              <Card>
                <CardHeader>
                  {card.icon}
                  <CardTitle className="text-white mt-4">{card.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {card.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Features;
