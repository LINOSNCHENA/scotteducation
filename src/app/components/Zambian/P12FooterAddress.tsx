
"use client";

import Image from "next/image";
import {
  COMP_LOGO,
  COMP_NAME,
  COMP_MOBILE,
  COMP_EMAIL,
  COMP_STREET,
  COMP_COUNTRY,
  COMP_TOWN,
  COMP_COMPOUND,
  COMP_PHONE,
  COMP_EMAIL1,
  COMP_EMAIL3,
  COMP_EMAIL2,
  COMP_COPYRIGHT,
} from "@/app/utils/NexusData";
import { FaLinkedin, FaWhatsapp, FaFacebook, FaDiscord, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaLinkedin />,
    href: `https://www.linkedin.com/company/${COMP_NAME}`,
    label: "LinkedIn",
    color: "text-blue-600 hover:text-blue-500",
  },
  {
    icon: <FaWhatsapp />,
    href: `https://wa.me/${COMP_MOBILE}`,
    label: "WhatsApp",
    color: "text-emerald-600 hover:text-emerald-500",
  },
  {
    icon: <FaFacebook />,
    href: `https://www.facebook.com/${COMP_NAME}`,
    label: "Facebook",
    color: "text-blue-700 hover:text-blue-600",
  },
  {
    icon: <FaDiscord />,
    href: `https://discord.gg/${COMP_NAME}`,
    label: "Discord",
    color: "text-indigo-600 hover:text-indigo-500",
  },
];

const contactInfo = [
  {
    title: "Address",
    icon: <FaMapMarkerAlt className="text-rose-600" />,
    items: [COMP_STREET, COMP_TOWN, COMP_COMPOUND, COMP_COUNTRY],
  },
  {
    title: "Contact",
    icon: <FaPhone className="text-sky-600" />,
    items: [`Primary: ${COMP_MOBILE}`, `Secondary: ${COMP_PHONE}`, `Support: ${COMP_MOBILE}`, `Fax: ${COMP_PHONE}`],
    isPhone: true,
  },
  {
    title: "Email",
    icon: <FaEnvelope className="text-emerald-600" />,
    items: [`Info: ${COMP_EMAIL.toLowerCase()}`, `Support: ${COMP_EMAIL1.toLowerCase()}`, `Sales: ${COMP_EMAIL3.toLowerCase()}`, `Careers: ${COMP_EMAIL2.toLowerCase()}`],
    isEmail: true,
  },
  {
    title: "Hours",
    icon: <FaClock className="text-amber-600" />,
    items: ["Monday-Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed", "Holidays: Special Schedule"],
  },
];

export function S12AddressFooter() {
  return (
    <footer className="w-full min-w-9xl py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="min-w-8xl mx-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-[85%]"> 
        <div className="flex flex-col items-center mb-12 w-full">
          {COMP_LOGO && (
            <div className="relative w-36 h-36 mb-8">
              <Image src={COMP_LOGO} alt={`${COMP_NAME} Logo`} fill className="object-contain" priority sizes="(max-width: 768px) 120px, 144px" />
            </div>
          )}

          <p className="text-gray-500 mb-8 text-sm text-center font-medium">{COMP_COPYRIGHT}</p>

          <div className="flex justify-center space-x-8 mb-10">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-3xl transition-all duration-300 hover:scale-110`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Dividing line - now spans full width */}
        <hr className="border-gray-200 my-8 w-full" />

        {/* Information Grid - now uses wider column spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {contactInfo.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-3 text-gray-800">
                <span className="text-2xl">{section.icon}</span>
                <span>{section.title}</span>
              </h3>
              <div className="text-gray-600 space-y-2.5">
                {section.items.map((item, i) => {
                  if (section.isPhone) {
                    const phoneNumber = item.split(": ")[1];
                    return (
                      <p key={i} className="font-medium">
                        {item.split(": ")[0]}:{" "}
                        <a href={`tel:${phoneNumber}`} className="text-sky-600 hover:text-sky-500 transition-colors">
                          {phoneNumber}
                        </a>
                      </p>
                    );
                  } else if (section.isEmail) {
                    const [label, email] = item.split(": ");
                    return (
                      <p key={i} className="font-medium">
                        {label}:{" "}
                        <a href={`mailto:${email}`} className="text-emerald-600 hover:text-emerald-500 transition-colors">
                          {email}
                        </a>
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="font-medium">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
