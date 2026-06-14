"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

function FloatingWhatsApp() {
  return (
    <motion.a 
      href={WHATSAPP_LINK}
      target="_blank" 
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full z-40 flex items-center justify-center text-white shadow-2xl"
      style={{
        boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
      }}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-neon-blue opacity-30 animate-ping" />
      <MessageCircle size={26} />
    </motion.a>
  );
}

export default memo(FloatingWhatsApp);
