import React from "react";

export interface SubscriptionEmailProps {
  name: string;
  email: string;
  district: string;
  compound: string;
  location?: string | null;
}

export default function SubscriptionEmail({ name, email, district, compound, location }: SubscriptionEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ marginBottom: "1rem" }}>New Subscriber</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>District:</strong> {district}
      </p>
      <p>
        <strong>Compound:</strong> {compound}
      </p>
      <p>
        <strong>Location:</strong> {location ?? "—"}
      </p>
    </div>
  );
}
