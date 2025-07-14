//
// Motto
//

import { COMP_MOTTO } from "@/app/utils/Branding/DataPascal";
import ThreeCircles from "./Phylosophy/data";

export default function S3Motto() {
  return (
    // <section className="bg-gray-50 py-24 px-6 text-center">
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      {/* </section> */}
      <div className="min-w-7xl mx-auto">
        <h1 className="text-center text-xl md:text-5xl font-bold text-black mb-6">{COMP_MOTTO}</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-black">Premier IT solutions tailored for your business success</p>
        <div className="mb-12">
          <a
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Explore our services"
          >
            Explore Services
          </a>
        </div>
        <ThreeCircles />
      </div>
    </section>
  );
}
