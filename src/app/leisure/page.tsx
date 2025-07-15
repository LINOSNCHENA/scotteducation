// app/leisure/page.tsx

import LeisureActivitiesList from "../components/Carousel/DataTables/LeasureLists";

export default function LeisurePage() {
  return (
    <div className="container mx-auto py-8">
      <LeisureActivitiesList />
    </div>
  );
}
