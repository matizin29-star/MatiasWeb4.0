"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro não capturado:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
          <span className="text-3xl font-black text-white">!</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Algo deu errado
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Ocorreu um erro inesperado. Nossa equipe foi notificada automaticamente.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
