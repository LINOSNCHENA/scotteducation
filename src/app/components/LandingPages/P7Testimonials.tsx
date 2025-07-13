// pages/testimonials.tsx
const testimonials = [
  {
    name: "Zambia Power Corp",
    quote: "BroadImage delivered an excellent ERP solution that revolutionized our internal operations. Their support team is responsive and technically solid.",
    title: "IT Director, Zambia Power Corp",
  },
  {
    name: "HealthPlus Clinics",
    quote: "The network setup by BroadImage has been rock-solid. Zero downtime in over a year! Truly a dependable partner for our medical IT infrastructure.",
    title: "Operations Manager, HealthPlus Clinics",
  },
  {
    name: "Copperbelt Logistics",
    quote: "From custom CRM to cloud migration, BroadImage delivered beyond expectations. Their automation tools helped cut processing time by 40%.",
    title: "CEO, Copperbelt Logistics",
  },
  {
    name: "ZED Academy",
    quote: "Their team offered valuable consultancy during our digital transition. We now use integrated tools for admin, learning, and reporting.",
    title: "Principal, ZED Academy",
  },
];

export default function S9TestimonialsPage() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-500 hover:shadow-xl transition">
            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
            <div className="text-sm font-semibold text-blue-700">{t.name}</div>
            <div className="text-xs text-gray-500">{t.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
