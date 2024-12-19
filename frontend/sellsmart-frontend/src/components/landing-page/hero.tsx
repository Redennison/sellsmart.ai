"use client";

import { RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Props Interface
interface LandingProps {
    scrollToTarget: (targetDivRef: RefObject<HTMLDivElement | null>) => void;
    learnMoreRef: RefObject<HTMLDivElement | null>;
    getStartedRef: RefObject<HTMLDivElement | null>;
}

const Landing = ({
    scrollToTarget,
    learnMoreRef,
    getStartedRef
}: LandingProps) => {

    return (
        <section className="h-[100vh] relative overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
            <div className="relative mx-auto max-w-7xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeInText opacity-1">
                    Sell Your Car at the Perfect Time
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                    SellSmartAI uses advanced AI to analyze market trends, vehicle condition, and optimal timing to help you get the best price for your car.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button
                        onClick={() => scrollToTarget(getStartedRef)}
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 group relative overflow-hidden"
                    >
                        Get Started
                    <ArrowRight
                        className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90"
                    />
                    </Button>
                    <Button 
                        onClick={() => scrollToTarget(learnMoreRef)}
                        variant="link" 
                        className="text-gray-300 hover:text-white"
                    >
                        Learn more
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Landing;
