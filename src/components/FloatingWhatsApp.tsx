"use client";

import { memo } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-electric text-white flex items-center justify-center glow-electric shadow-lg animate-fab-in hover:scale-110 active:scale-95 transition-transform duration-200"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

export default memo(FloatingWhatsApp);
