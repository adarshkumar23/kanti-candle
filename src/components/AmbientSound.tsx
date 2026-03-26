"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use a free crackling fire audio from a CDN
    audioRef.current = new Audio("https://www.soundjay.com/nature/sounds/fireplace-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => { audioRef.current?.pause(); };
  }, []);

  async function toggle() {
    if (!audioRef.current) return;
    if (enabled) {
      audioRef.current.pause();
      setEnabled(false);
    } else {
      setLoading(true);
      try {
        await audioRef.current.play();
        setEnabled(true);
      } catch {}
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      title={enabled ? "Mute ambient sound" : "Play crackling fireplace"}
      className={`fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
        enabled
          ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-black shadow-[0_0_20px_rgba(201,168,76,0.5)]"
          : "bg-[var(--color-bg-card)] border-[rgba(201,168,76,0.3)] text-[var(--color-faint)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
      }`}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
}
