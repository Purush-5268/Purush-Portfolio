"use client";
import { useState } from "react";
import { profile } from "@/data/profile";
import { playTransmitSignalSound, playSuccessChimeSound, playHoverSound } from "@/lib/soundEffects";

export default function ContactScene() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTransmitSignalSound();
    setFormState("sending");

    const subject = encodeURIComponent(`[Portfolio Direct Message] from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Purushotham,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your Portfolio Site.`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      playSuccessChimeSound();
      setFormState("sent");
      setTimeout(() => {
        setFormState("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }, 900);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-between pt-24 pb-12 overflow-hidden border-t border-white/[0.08] bg-[#06080E] perspective-3d"
    >
      {/* Space Satellite Antenna & Ground Station Backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cinematic pointer-events-none"
        style={{
          backgroundImage: "url('/images/contact_bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,94,30,0.16)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.14)_0%,transparent_50%)] pointer-events-none cyber-glow-pulse" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(6,8,14,0.35)_0%,rgba(6,8,14,0.85)_55%,#06080E_95%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080E] via-transparent to-[#06080E] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 relative z-10 my-auto preserve-3d">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-mono text-xs tracking-[0.25em] text-[#FF5E1E] uppercase mb-3 bg-[#0B101D]/90 px-4 py-1.5 rounded-full border border-[#FF5E1E]/40 backdrop-blur-md font-bold shadow-[0_0_20px_rgba(255,94,30,0.25)]">
              START A CONVERSATION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Let&apos;s Build <br />
              <span className="text-[#FF5E1E] drop-shadow-[0_0_20px_rgba(255,94,30,0.5)]">
                Something Remarkable.
              </span>
            </h2>
            <p className="font-body text-[#e2e8f0] text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Actively open to 2027 internships &amp; full-time roles (PPO), silicon engineering discussions, and software collaborations. Feel free to connect directly.
            </p>

            {/* Contact Details Cards */}
            <div className="flex flex-col gap-3 w-full max-w-md mb-8">
              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-xl bg-[#0B101D]/90 border border-white/15 hover:border-[#FF5E1E]/50 backdrop-blur-xl shadow-lg transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF5E1E]/15 flex items-center justify-center text-[#FF5E1E] font-mono text-sm font-bold">
                    @
                  </div>
                  <div>
                    <span className="font-mono text-[0.65rem] text-[#94a3b8] uppercase block">
                      EMAIL ADDRESS (DIRECT)
                    </span>
                    <span className="font-mono text-xs text-white group-hover:text-[#FF5E1E] transition-colors font-semibold">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <span className="text-[#FF5E1E] group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              <div className="p-4 rounded-xl bg-[#0B101D]/90 border border-white/15 backdrop-blur-xl shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B] font-mono text-sm font-bold">
                    ⌁
                  </div>
                  <div>
                    <span className="font-mono text-[0.65rem] text-[#94a3b8] uppercase block">
                      PHONE / WHATSAPP
                    </span>
                    <span className="font-mono text-xs text-white font-semibold">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[0.65rem] text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded font-semibold">
                  {profile.location}
                </span>
              </div>
            </div>

            {/* Social Pill Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-lg bg-[#0B101D] border border-white/15 hover:border-[#FF5E1E] text-white hover:text-[#FF5E1E] backdrop-blur-md transition-all font-semibold cursor-pointer"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-lg bg-[#0B101D] border border-white/15 hover:border-[#FF5E1E] text-white hover:text-[#FF5E1E] backdrop-blur-md transition-all font-semibold cursor-pointer"
              >
                GitHub ↗
              </a>
              {profile.youtube && (
                <a
                  href={profile.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-lg bg-[#0B101D] border border-white/15 hover:border-[#F59E0B] text-white hover:text-[#F59E0B] backdrop-blur-md transition-all font-semibold cursor-pointer"
                >
                  YouTube ↗
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-[#0B101D]/90 backdrop-blur-2xl p-6 sm:p-8 border border-white/15 rounded-2xl shadow-2xl relative"
            >
              {/* Destination Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-display font-bold text-xl text-white">
                  Send a Direct Message
                </h3>
                <span className="font-mono text-[0.62rem] text-[#FF5E1E] bg-[#FF5E1E]/10 border border-[#FF5E1E]/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                  <span>DIRECT TO INBOX</span>
                </span>
              </div>

              {/* Destination Explanation */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-[#cbd5e1] flex items-center justify-between">
                <span>Destination:</span>
                <span className="text-[#FF5E1E] font-bold">{profile.email}</span>
              </div>

              <div>
                <label className="font-mono text-[0.65rem] text-[#94a3b8] uppercase mb-1 block">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Himanshu / Engineering Recruiter"
                  required
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm outline-none focus:border-[#FF5E1E] transition-colors placeholder:text-[#64748b]"
                />
              </div>

              <div>
                <label className="font-mono text-[0.65rem] text-[#94a3b8] uppercase mb-1 block">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@company.com"
                  required
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm outline-none focus:border-[#FF5E1E] transition-colors placeholder:text-[#64748b]"
                />
              </div>

              <div>
                <label className="font-mono text-[0.65rem] text-[#94a3b8] uppercase mb-1 block">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your role, project, or technical question..."
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm outline-none focus:border-[#FF5E1E] transition-colors placeholder:text-[#64748b] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== "idle"}
                onMouseEnter={playHoverSound}
                className="w-full bg-gradient-to-r from-[#FF5E1E] to-[#F59E0B] text-white font-mono text-xs font-bold tracking-widest uppercase py-4 rounded-xl mt-2 transition-all hover:shadow-[0_0_25px_rgba(255,94,30,0.6)] disabled:opacity-80 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {formState === "idle" && "TRANSMIT MESSAGE ⚡"}
                {formState === "sending" && "TRANSMITTING TO 23pa1a04b4@vishnu.edu.in..."}
                {formState === "sent" && "✓ MESSAGE DISPATCHED TO PURUSHOTHAM"}
              </button>

              {/* Quick direct links */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[0.65rem] font-mono">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=Portfolio+Inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94a3b8] hover:text-[#FF5E1E] transition-colors"
                >
                  Open in Gmail Web ↗
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-[#F59E0B] hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? "✓ Copied to clipboard!" : "Copy Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-12 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94a3b8]">
        <div>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Bhimavaram, Andhra Pradesh, India</span>
          <span>•</span>
          <span className="text-[#FF5E1E]">Building Systems from Silicon to Software</span>
        </div>
      </footer>
    </section>
  );
}
