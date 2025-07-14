//
// Delivery
//

"use client";

import { Button } from "@react-email/components";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Input } from "./ui/input";

function simulateDistanceCalculation(source: string, destination: string): number {
  // Dummy function: returns a fake distance based on string lengths
  if (!source || !destination) return 0;
  return Math.abs(source.length * 2 - destination.length * 2) + 5; // just for mock
}

function calculateCost(distance: number, weight: number): number {
  const baseRate = 2.5; // base dollar per km
  const weightFactor = weight > 5 ? 1.2 : 1.0; // heavier parcels cost more
  return parseFloat((distance * baseRate * weightFactor).toFixed(2));
}

const LouisDeliveryService: React.FC = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);

  const handleCalculate = () => {
    if (!source || !destination || !weight) return;

    const dist = simulateDistanceCalculation(source, destination);
    const deliveryCost = calculateCost(dist, Number(weight));

    setDistance(dist);
    setCost(deliveryCost);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="p-4 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Louis Delivery Service</h2>
        <CardContent className="space-y-4">
          <Input placeholder="Enter pickup location" value={source} onChange={(e) => setSource(e.target.value)} />
          <Input placeholder="Enter destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <Input type="number" placeholder="Parcel weight (kg)" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />

          <Button onClick={handleCalculate}>Calculate Delivery Cost</Button>

          {distance > 0 && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Distance:</strong> {distance} km
              </p>
              <p>
                <strong>Cost:</strong> ${cost}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LouisDeliveryService;
