import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
    const cards = [
      {
        number: "1",
        title: "Enter Your Car Details",
        description: "Provide basic information about your vehicle including make, model, year, and condition.",
      },
      {
        number: "2",
        title: "Get AI Analysis",
        description: "Our AI analyzes market trends, seasonal patterns, and local demand to determine the best time to sell.",
      },
      {
        number: "3",
        title: "Maximize Your Sale",
        description: "Receive detailed recommendations and timing advice to get the best possible price for your car.",
      },
    ];

    return (
        <section className="py-24 bg-black flex items-center justify-center">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    How SellSmartAI Works
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card, index) => (
                        <div key={index} className="relative pl-16">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
                                {card.number}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}