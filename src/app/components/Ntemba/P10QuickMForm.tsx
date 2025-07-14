"use client";

import { API_POST_CONTACT } from "@/app/utils/Branding/ApiRoutes";
import React, { useState } from "react";
import { BUTTONS } from "@/app/utils/stylesData";
// import { COMP_MOTTO } from "@/app/utils/Branding/NexusData";
import WatermarkBackground from "./MenuDown/WaterMarks";
import { COMP_MOTTO } from "@/app/utils/Branding/DataPascal";

const S10SendEmailForm = () => {
  const subjectId = "subjectFakes";
  const [formData, setFormData] = useState({
    username: "",
    senderEmail: "",
    subject: subjectId,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    console.log(formData);

    // Validation
    if (!formData.senderEmail.includes("@")) {
      setStatus({
        text: "Please enter a valid email address.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (formData.message.length < 7) {
      setStatus({
        text: "Message must be at least 7 characters.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_POST_CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus({
        text: "Message sent successfully! We'll get back to you soon.",
        type: "success",
      });

      // Reset form
      setFormData({
        senderEmail: "",
        username: "",
        subject: "News",
        message: "",
      });
    } catch (error) {
      setStatus({
        text: error instanceof Error ? error.message : "Failed to send message.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 bg-gray-50 rounded-lg mt-9 mb-9">
      <div className="max-w-7xl mx-auto bg-gray-200 p-1 rounded-lg shadow-md relative">
        <WatermarkBackground altText={COMP_MOTTO} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white mt-2 p-6 rounded-lg bg-red-400">
          {/* Email Field */}
          <div>
            <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              id="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="e.g., mulenga.gates@example.com"
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 py-2 bg-white  text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contact Person Name"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full  py-2 bg-white  text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="How can we help you?"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={`${BUTTONS.smallButton} mt-2`} disabled={isLoading} aria-disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message 📩"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-4 p-4 rounded-md ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
          >
            {status.text}
          </div>
        )}
      </div>
    </section>
  );
};

export default S10SendEmailForm;
