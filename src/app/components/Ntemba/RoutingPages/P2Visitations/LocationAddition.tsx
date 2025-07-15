
//
// nEW rECORD
//
"use client";
import { API_VISITATIONS } from "@/app/utils/Branding/ApiRoutes";
import { supabase } from "@/lib/supabase";
import { IVisit } from "@/types/Models.subscriptions";
import { useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const TableName = "visits_pascal";

export default function VisitLogger() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        const fp = await FingerprintJS.load();
        const { visitorId } = await fp.get();

        const res = await fetch(API_VISITATIONS);
        const info = await res.json();

        const visitData: IVisit = {
          ip: info.ip,
          city: info.city,
          country: info.country_name,
          region: info.region,
          latitude: info.latitude || 0,
          longitude: info.longitude || 0,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString(),
          asn: info.asn,
          device_id: visitorId,
        };

        const { data } = await supabase.from(TableName).select().order("created_at", { ascending: false });

        const today = data?.filter((z) => z.device_id === visitorId) ?? [];
        const presentToday = today.length > 0;
        const todayVisited = presentToday && !!today[0].created_at && new Date(today[0].created_at).toDateString() === new Date().toDateString();

        // Save visit-related data to localStorage
        localStorage.setItem("visitsID", JSON.stringify(visitorId));
        localStorage.setItem("visitsData", JSON.stringify(data));
        localStorage.setItem("address", JSON.stringify(visitData));
        localStorage.setItem("city", JSON.stringify(info.city));
        localStorage.setItem("inforAll", JSON.stringify(info));
        localStorage.setItem("hasVisited", "true");
        localStorage.setItem("today", JSON.stringify(today));
        localStorage.setItem("presentToday", JSON.stringify(presentToday));
        localStorage.setItem("repeatToday", JSON.stringify(todayVisited));

        const visitsJSON = localStorage.getItem(TableName);
        const visits = visitsJSON ? JSON.parse(visitsJSON) : [];
        visits.push(visitData);
        localStorage.setItem("visits", JSON.stringify(visits));

        if (presentToday && todayVisited) {
          console.log("This device has already visited today. Skipping database log.");
        } else {
          console.log("Logging new visit to the database.");
          const z = await supabase.from(TableName).insert([visitData]);
          console.log(z);
          console.log(visitData);
        }
      } catch (err) {
        console.error("An error occurred while logging the visit:", err);
      }
    };

    logVisit();
  }, []);

  return null;
}
