import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="container mx-auto">
      <div className="mb-15">
        <h2 className="font-semibold text-red-500 ps-9  mb-5 before:content-[''] before:rounded-sm before:absolute before:top-1/2 before:start-0 before:-translate-y-1/2 before:w-5 before:h-10 before:bg-red-500 relative">{title}</h2>
        <span className="font-semibold text-4xl">{subtitle}</span>
      </div>
    </div>
  );
}
