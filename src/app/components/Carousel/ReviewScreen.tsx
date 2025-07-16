import { useState, useEffect } from "react";
// import Button from "../ui/button";
import { fetchLeisureTrips } from "@/lib/api";
import { RegistrationData, ILeisureTrip } from "@/types/Model.Universities";
import { Button } from "../ui/button";

interface LeisureSelectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function LeisureSelection({ data, updateData, nextStep, prevStep }: LeisureSelectionProps) {
  const [trips, setTrips] = useState<ILeisureTrip[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<ILeisureTrip[]>(data.leisureTrips || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      try {
        const fetchedTrips = await fetchLeisureTrips();
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Failed to fetch leisure trips:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  const toggleTrip = (trip: ILeisureTrip) => {
    setSelectedTrips((prev) => {
      const exists = prev.some((t) => t.id === trip.id);
      if (exists) {
        return prev.filter((t) => t.id !== trip.id);
      } else {
        return [...prev, trip];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ leisureTrips: selectedTrips });
    nextStep();
  };

  if (loading) return <div>Loading leisure trips...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Leisure Trip Selection</h2>
      <p className="text-sm text-gray-600">Select the leisure trips you want to participate in. Current selection: {selectedTrips.length} trips</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className={`border rounded overflow-hidden ${selectedTrips.some((t) => t.id === trip.id) ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => toggleTrip(trip)}
          >
            <div className="p-4">
              <h3 className="font-medium">{trip.name}</h3>
              <p className="text-sm text-gray-600">{trip.destination}</p>
              <div className="mt-2 text-sm">
                <p>
                  {new Date(trip.start_date).toLocaleDateString()} -{new Date(trip.end_date).toLocaleDateString()}
                </p>
                <p className="font-medium mt-1">${trip.cost.toFixed(2)}</p>
              </div>
              {trip.max_participants && <p className="text-xs mt-1">Max participants: {trip.max_participants}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
