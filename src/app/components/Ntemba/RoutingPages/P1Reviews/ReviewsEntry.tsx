"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { COMP_MOTTO } from "@/app/utils/Branding/DataPascal";
import { supabase } from "@/lib/supabase";
import WatermarkBackground from "../../MenuDown/WaterMarks";
const TableName = "reviews_chitundu";

interface ReviewForm {
  name: string;
  location: string;
  review: string;
  rating: number;
}

const ReviewsAddition = () => {
  const [form, setForm] = useState<ReviewForm>({
    name: "",
    location: "",
    review: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.review.trim() || form.rating === 0) {
      setSubmitStatus("error");
      return;
    }

    try {
      setLoading(true);
      console.log(form);
      const { error } = await supabase.from(TableName).insert([form]).select();
      if (error) throw error;
      setForm({ name: "", location: "", review: "", rating: 0 });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-2 rounded-xl shadow-sm">
        <WatermarkBackground altText={COMP_MOTTO} />

        <header className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
          <p className="text-gray-900">We value your honest feedback</p>
        </header>

        {/* Status Messages - Positioned below header */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 text-green-900 rounded-lg border border-green-200">Thank you for your review! We appreciate your time.</div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">Please complete all required fields (*) to submit your review.</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 border border-gray-200 p-9 text-black">
          {/* Name and Location - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Your Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="City, Country"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Rating - Centered with proper spacing */}
          <div className="space-y-2">
            <label className="block text-sm  border-gray-900 font-medium text-gray-700 text-center md:text-left">Your Rating *</label>
            <div className="flex justify-center md:justify-start items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className="focus:outline-none p-1" aria-label={`Rate ${star} star`}>
                  <Star className={`w-8 h-8 transition-colors ${form.rating >= star ? "text-amber-500 fill-amber-500" : "text-grey-900 hover:text-amber-400"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Review - Full width with proper height */}
          <div className="space-y-2">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Your Review *
            </label>
            <textarea
              id="review"
              placeholder="Tell us about your experience..."
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className="w-full px-4 py-3 text-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              rows={5}
              required
            />
          </div>

          {/* Submit Button - Centered with proper width */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewsAddition;
