"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { COMP_LOGO } from "@/app/utils/Branding/DataPascal";
import { formatDate } from "@/app/utils/Functions";
import { supabase } from "@/lib/supabase";
import { IReview } from "@/types/Models.subscriptions";

const ReviewSelect = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadsize, setSize] = useState(0);
  const [loadtotal, setTotal] = useState(0);
  const TableName = "reviews_chitundu";

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from(TableName).select("*").order("created_at", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }
        const dataUpdated = data.slice(0, 6);
        setReviews(dataUpdated || []);
        setSize(data.length || 0);
        setTotal(dataUpdated.length || 0);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-12">Loading r-reviews...</div>;
  return (
    <section className="py-2 px-2 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-8xl mx-auto w-full text-black bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-bold text-center mb-2 mt-2">
          Reviews ({loadtotal}/{loadsize}) | Listed this Month
        </h2>

        <div className="bg-gray-200 p-6 grid gap-6 md:grid-cols-2">
          {/* <WatermarkBackground altText={COMP_MOTTO} /> */}
          {reviews.map((rev) => {
            const avatarUrl = rev.avatar_url || COMP_LOGO;
            return (
              <div key={rev.id} className="bg-white text-black p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={avatarUrl}
                      alt={rev.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-white shadow"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = COMP_LOGO;
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{rev.name}</div>
                    <div className="text-sm text-gray-500">{rev.location}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{rev.review}&quot;</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className={`w-5 h-5 ${i <= rev.rating ? "text-yellow-400" : "text-gray-300"}`} fill={i <= rev.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <div className="text-xs text-gray-400">{formatDate(rev.created_at)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewSelect;
