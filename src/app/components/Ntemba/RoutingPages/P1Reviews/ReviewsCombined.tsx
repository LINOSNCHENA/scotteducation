// src/pages/ReviewsAndProjects.tsx

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { COMP_LOGO } from "@/app/utils/Branding/DataPascal";
import { formatDate, formatDateZM } from "@/app/utils/Functions";
import { supabase } from "@/lib/supabase";
import { IReview, IVisit } from "@/types/Models.subscriptions";

const ReviewsMixed: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const TableName = "reviews_pascal";
  const TableName2 = "visits_pascal";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [reviewRes, visitRes] = await Promise.all([
        supabase.from(TableName).select("*").order("created_at", { ascending: false }),
        supabase.from(TableName2).select("*").order("created_at", { ascending: false }),
      ]);

      if (reviewRes.error || visitRes.error) {
        console.error("Error fetching data:", reviewRes.error, visitRes.error);
      } else {
        setReviews(reviewRes.data || []);
        setVisits(visitRes.data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-600">Loading client reviews and visits...</p>
      </div>
    );
  }

  if (!reviews.length && !visits.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-600">No data available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-2 px-2 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-8xl mx-auto w-full text-black bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mt-2 mb-2 text-pink-800"> Recent Visitators to our page ({visits.length})</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visits.map((project) => (
            <div key={project.id} className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-sm">
              <h4 className="font-semibold text-base">{project.device_id}</h4>
              <p className="text-gray-700">{project.region}</p>
              <h4 className="font-semibold">
                {project.city} | {project.country}
              </h4>
              <p className="text-sm text-gray-500">
                {project.latitude} | {project.longitude}
              </p>
              <small className="text-xs text-gray-600">{formatDateZM(project.created_at)}</small>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-6 text-pink-800">Client Reviews ({reviews.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Image src={review.avatar_url || COMP_LOGO} alt={review.name} width={50} height={50} className="rounded-full" />
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-gray-500 italic">{review.location}</p>
                </div>
              </div>
              <p className="mb-2 text-gray-700">{review.review}</p>
              <p className="text-sm text-gray-600">
                {formatDate(review.created_at)} • Rating: {review.rating} ⭐
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsMixed;
