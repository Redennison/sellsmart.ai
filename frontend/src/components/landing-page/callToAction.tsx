import { Button } from "@/components/ui/button";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="py-24 bg-slate-900 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-purple-600 transition-shadow hover:shadow-2xl hover:shadow-purple-800">
          <div className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Get the Best Value for Your Car?
              </h2>
              <p className="mt-6 text-lg leading-8 text-purple-100">
                Join thousands of smart sellers who use SellSmartAI to time their car sales perfectly.
              </p>
              <div className="mt-10">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-300">
                    Start Your Free Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
})

export default CallToAction;
