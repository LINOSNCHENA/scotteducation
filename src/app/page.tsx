//
// Data
//

import { fetchCurrentPeriod, fetchUniversities } from "@/lib/api";
import RegistrationCarousel from "./components/Carousel/RegistrationCarousel";

export default async function Home() {
  const universities = await fetchUniversities();
  const currentPeriod = await fetchCurrentPeriod();

  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-6">Student Registration</h1>
      <RegistrationCarousel universities={universities} currentPeriod={currentPeriod} />
    </main>
  );
}
