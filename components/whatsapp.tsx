"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  return (
    <Link
      href="https://wa.me/923335673693?text=Hi,%20I%20want%20to%20discuss%20a%20Ad%20campaign%20with%20you."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-60 group-hover:opacity-90 transition-all duration-300 animate-pulse"></div>

      {/* Button */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-[0_15px_35px_rgba(37,211,102,0.6)] transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <FaWhatsapp className="w-18 h-18 drop-shadow-lg" />
      </div>
    </Link>
  );
};

export default FloatingWhatsApp;
