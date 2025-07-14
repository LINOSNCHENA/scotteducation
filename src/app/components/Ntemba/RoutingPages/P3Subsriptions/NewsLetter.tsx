//
// News letters
//
"use client";
import { useEffect, useState } from "react";
import { EMAIL_MASTER } from "@/app/utils/Branding/ApiRoutes";
import { supabase } from "@/lib/supabase";
import { ISubscription } from "@/types/Models.subscriptions";

function NewsletterSubscription() {
  const x: ISubscription = {
    name: "",
    email: "",
    location: "",
    address: {},
    compound: "",
    district: "",
    unsubscribed: "",
  };
  const [form, setForm] = useState(x);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [geoError, setGeoError] = useState("");
  const TableName = "subscriptionsv2";

  // Auto-fetch location on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        setGeoError("Geolocation is not supported by your browser");
        return;
      }
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000, // 10 seconds timeout
          });
        });
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&email=${EMAIL_MASTER}`;
        console.log(url);
        // Reverse geocode using OpenStreetMap's Nominatim
        try {
          const res = await fetch(String(url), {
            headers: {
              "Accept-Language": "en", // Request English results
            },
          });
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || "";
          const country = data.address.country || "";
          setForm((prev) => ({
            ...prev,
            location: `${city}, ${country}`,
            address: data.address,
            compound: data.address.suburb || "",
            district: data.address.city_district || "",
            unsubscribed: "No",
          }));
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          setGeoError("Could not determine your location. Please enter it manually.");
        }
      } catch (err) {
        console.warn("Geolocation error:", err);
        setGeoError("Please enable location access or enter your location manually.");
      }
    };
    fetchLocation();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setStatus("❌ Please provide your name and email");
      return;
    }
    setLoading(true);
    setStatus("");
    const datax: ISubscription = form;
    console.log(form);
    console.log(datax);

    try {
      const { data, error } = await supabase.from(TableName).insert([datax]);
      console.log(data);

      if (error) {
        console.error(error);
        setStatus("❌ Subscription failed. Please try again.");
      } else {
        setStatus("✅ Successfully 1-subscribed!");
        setForm(x);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-2 px-6 lg:px-12 bg-gray-50 rounded-md">
      <div className="max-w-6xl mx-auto bg-gray-200 p-2 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-2 text-center text-gray-800">Subscribe to Our Newsletter</h2>

        <div className="space-y-4 bg-gray-50 p-3 rounded-md">
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-400"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your email or WhatsApp"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-400"
            value={form.email}
            onChange={handleChange}
            required
          />

          {geoError && <div className="text-yellow-700 text-sm">{geoError}</div>}

          {form.location && <div className="text-sm text-gray-600">📍 Detected location: {form.location}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-md transition-colors duration-200 ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Subscribe to Newsletter"}
          </button>

          {status && <p className={`text-center text-sm mt-4 ${status.includes("✅") ? "text-green-600" : "text-red-600"}`}>{status}</p>}
        </div>
      </div>
    </section>
  );
}

export default NewsletterSubscription;
