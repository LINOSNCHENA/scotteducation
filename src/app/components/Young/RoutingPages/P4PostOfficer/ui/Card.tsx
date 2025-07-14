import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return <div className={`bg-white border border-gray-200 rounded-lg shadow-md ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
