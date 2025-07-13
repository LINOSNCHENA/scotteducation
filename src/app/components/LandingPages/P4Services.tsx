// components/Services.tsx

import Image from "next/image";

interface Service {
  title: string;
  description: string;
  url: number | string;
}

const services: Service[] = [
  { url: 7, title: "Hardware & Network Solutions", description: "IT Infrastructure SetUp & Mentainance, Enterprise Networking & Cybersecurity, Server & Data Center Solutions." },
  { url: 2, title: "Software & Automation", description: "Custom Software Development, Business Process Automation, ERP & CRM Solutions, Cloud Computing & Migration." },
  {
    url: 3,
    title: "IT Consultancy & Digital Transformation ",
    description: "Technological Strategy Advisory, Digital Workplace Solutions, IT training & Capacity Building. Data Analytics & Business Intelligience",
  },
  { url: 4, title: "Managed IT Services", description: "24/7 Technical support, Proactive IT monitoring & Maintenance, Disaster Recovery & Backup Solutions." },
];

export default function S4Services() {
  return (   
    <section className="py-16 px-6 bg-gradient-to-br from-white via-gray-50 to-blue-50">    
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="border p-6 rounded-lg shadow-md relative h-80">
            <div className="relative h-32 w-full mb-4">
              <Image
                src={`/logos/${service.url}.png` || `/logos/${service.url}.jpg`}
                alt={service.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
