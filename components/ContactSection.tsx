"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative w-full bg-[#F7F5F0] py-32 md:py-44 lg:py-52 px-8 md:px-20 lg:px-32"
    >
      <div className="max-w-4xl mx-auto">
        {/* Editorial Section Label */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs font-mono tracking-[0.25em] text-black/40 uppercase mb-4 md:mb-6 select-none">
          <span className="w-1.5 h-1.5 bg-black inline-block" />
          <span>INQUIRIES</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-none text-[#0A0A0A] mb-4 md:mb-6">
          CONTACT
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-light tracking-tight text-[#0A0A0A]/70 mb-16 md:mb-20">
          Have something interesting in mind?
        </p>

        {/* Minimal Editorial Form */}
        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16 max-w-2xl">
          {/* Name Field */}
          <div className="relative group">
            <label
              htmlFor="name"
              className="block text-xs md:text-sm font-mono tracking-widest text-black/50 uppercase mb-2 group-focus-within:text-black transition-colors"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name or organization"
              className="w-full bg-transparent border-b border-black/20 focus:border-black rounded-none py-3 text-base md:text-lg text-[#0A0A0A] placeholder:text-black/25 focus:outline-none transition-colors"
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <label
              htmlFor="email"
              className="block text-xs md:text-sm font-mono tracking-widest text-black/50 uppercase mb-2 group-focus-within:text-black transition-colors"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@domain.com"
              className="w-full bg-transparent border-b border-black/20 focus:border-black rounded-none py-3 text-base md:text-lg text-[#0A0A0A] placeholder:text-black/25 focus:outline-none transition-colors"
            />
          </div>

          {/* Message Field */}
          <div className="relative group">
            <label
              htmlFor="message"
              className="block text-xs md:text-sm font-mono tracking-widest text-black/50 uppercase mb-2 group-focus-within:text-black transition-colors"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Brief overview of what you're building..."
              className="w-full bg-transparent border-b border-black/20 focus:border-black rounded-none py-3 text-base md:text-lg text-[#0A0A0A] placeholder:text-black/25 focus:outline-none resize-none transition-colors"
            />
          </div>

          {/* Submit Row */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center gap-3 text-sm md:text-base font-mono tracking-[0.2em] uppercase font-bold text-[#0A0A0A] hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-black py-2"
            >
              <span className="relative">
                {status === "submitting" ? "SENDING..." : status === "success" ? "SENT" : "SEND"}
                <span className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-[#0A0A0A]" />
              </span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
                →
              </span>
            </button>

            {status === "success" && (
              <span className="text-xs font-mono text-black/60 tracking-wider">
                Message received. Thank you.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
